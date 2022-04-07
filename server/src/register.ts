import { RequestHandler } from "express";
import { insert } from "./db";
import { isNonDefault, wrangleCheckbox } from "./utils";
import * as yup from "yup";

const teamValidator = yup.object({
    team_name: yup
        .string()
        .min(2, "Team name must be at least two characters")
        .max(50, "Team name cannot exceed 50 characters")
        .required("Team name is required"),
    trxn_id: yup.string().required("Transaction ID is required"),
    team_size: yup
        .number()
        .min(3, "Team size must be at least 3")
        .max(4, "Team size can be at most 4")
        .required("Team size is required"),
});

const participantValidator = yup.object({
    participant_name: yup.string().required("Participant name is required"),
    participant_regno: yup.string().required("Participant registration number is required"),
    participant_phone: yup.string().required("Participant phone number is required"),
    participant_email: yup.string().email().required("Participant email is required"),
    is_day_scholar: yup.string(),
});

const participantsValidator = yup.array().length(3).of(participantValidator);

export const register: RequestHandler = (req, res, next) => {
    try {
        const { team_size, team_name, trxn_id, participants, optional_participant } = req.body;

        const team = { team_name, trxn_id, team_size };

        teamValidator.validateSync(team);

        participantsValidator.validateSync(participants);

        if (team_size == 4) {
            participantValidator.validateSync(optional_participant);
            participants.push(optional_participant);
        }

        insert(team, participants);

        res.send("<h1>Registered Successfully</h1>");
    } catch (e: any) {
        if (e.name === "ValidationError")
            return res.send(`<h1>Invalid registration details</h1> <p>${e.errors.join()}</p>`);

        if (e.code === "SQLITE_CONSTRAINT_UNIQUE")
            return res.send(
                `<h1>Registration already exists. Please choose a different team name</h1>`
            );
        next(e);
    }
};
