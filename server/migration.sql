PRAGMA foreign_keys = 1;

CREATE TABLE IF NOT EXISTS teams(
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_name TEXT UNIQUE NOT NULL,
    trxn_id TEXT NOT NULL,
    team_size INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS participants(
    participant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_name TEXT NOT NULL,
    participant_regno TEXT NOT NULL,
    participant_phone TEXT NOT NULL,
    participant_email TEXT NOT NULL,
    is_day_scholar INTEGER NOT NULL,
    team_id INTEGER REFERENCES teams(team_id)
);