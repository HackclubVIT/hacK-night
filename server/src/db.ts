import Database from "better-sqlite3";
import * as fs from "fs";

export const db = new Database("db.sqlite3");
db.exec(fs.readFileSync("migration.sql").toString());

const team_prepared_insert = db.prepare(
    "INSERT INTO teams(team_name, trxn_id) VALUES(@team_name, @trxn_id)"
);

export const insert_team = (team: any) => team_prepared_insert.run(team);

const participant_prepared_insert = db.prepare(
    "INSERT INTO participants(participant_name, participant_regno, participant_phone, participant_email, is_day_scholar, team_id) VALUES(@participant_name, @participant_regno, @participant_phone, @participant_email, @is_day_scholar, @team_id)"
);

export const insert_participants = (participants: any[]) =>
    participants.forEach(participant => participant_prepared_insert.run(participant));
