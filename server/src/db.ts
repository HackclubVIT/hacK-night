import Database from "better-sqlite3";
import * as fs from "fs";
import { wrangleDayScholarCheckbox, wrangleMealPref } from "./utils";

export const db = new Database("db.sqlite3");
db.exec(fs.readFileSync("migration.sql").toString());

const team_prepared_insert = db.prepare(
    "INSERT INTO teams(team_name, trxn_id, team_size) VALUES(@team_name, @trxn_id, @team_size)"
);

const insert_team = (team: any) => team_prepared_insert.run(team);

const participant_prepared_insert = db.prepare(
    "INSERT INTO participants(participant_name, participant_regno, participant_phone, participant_email, gender, is_day_scholar, hostel_block, is_vegetarian, team_id) VALUES(@participant_name, @participant_regno, @participant_phone, @participant_email, @gender, @is_day_scholar, @hostel_block, @is_vegetarian, @team_id)"
);

export const get_registration_counts = () => {
    const teams = db.prepare("select count(team_id) as team_count from teams;").get();
    const participants = db.prepare("select count(participant_name) as participant_count from participants;").get();

    return {
        ...teams, ...participants
    }
}

export const get_participants = () => {
    return db
        .prepare("select participant_name, participant_regno, participant_phone, participant_email, gender, is_day_scholar, hostel_block, is_vegetarian, team_id from participants;")
        .all();
}

export const get_teams = () => {
    return db
        .prepare("select team_id, team_name, trxn_id, team_size from teams;")
        .all();
}

const insert_participants = (participants: any[]) =>
    participants.forEach(participant => participant_prepared_insert.run(participant));

export const insert = db.transaction((team: any, participants: any) => {
    const { lastInsertRowid: team_id } = insert_team(team);
    insert_participants(
        participants.map((p: any) => ({
            ...wrangleDayScholarCheckbox(p),
            ...wrangleMealPref(p),
            team_id,
            hostel_block: p.is_day_scholar === 1 ? null : p.hostel_block,
        }))
    );
});
