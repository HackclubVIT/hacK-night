import Database from "better-sqlite3";
import * as fs from "fs";
import { wrangleCheckbox } from "./utils";

export const db = new Database("db.sqlite3");
db.exec(fs.readFileSync("migration.sql").toString());

const team_prepared_insert = db.prepare(
    "INSERT INTO teams(team_name, trxn_id, team_size) VALUES(@team_name, @trxn_id, @team_size)"
);

const insert_team = (team: any) => team_prepared_insert.run(team);

const participant_prepared_insert = db.prepare(
    "INSERT INTO participants(participant_name, participant_regno, participant_phone, participant_email, is_day_scholar, hostel_block, team_id) VALUES(@participant_name, @participant_regno, @participant_phone, @participant_email, @is_day_scholar, @hostel_block, @team_id)"
);

const insert_participants = (participants: any[]) =>
    participants.forEach(participant => participant_prepared_insert.run(participant));

export const insert = db.transaction((team, participants) => {
    const { lastInsertRowid: team_id } = insert_team(team);
    insert_participants(
        participants.map((p: any) => ({
            ...wrangleCheckbox(p),
            team_id,
            hostel_block: p.is_day_scholar === 1 ? null : p.hostel_block,
        }))
    );
});
