import { RequestHandler } from "express";
import { insert_participants, insert_team } from "./db";
import { isNonDefault, wrangleCheckbox } from "./utils";

export const register: RequestHandler = (req, res, next) => {
    const { team_name, trxn_id, participants, optional_participant } = req.body;

    if (isNonDefault(optional_participant)) participants.push(optional_participant);

    const { lastInsertRowid: team_id } = insert_team({ team_name, trxn_id });
    insert_participants(
        participants.map((p: any) => ({
            team_id,
            ...wrangleCheckbox(p),
        }))
    );

    res.end();
};
