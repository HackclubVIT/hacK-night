import { RequestHandler, Response } from "express";
import { get_teams, get_participants } from "./db";
const json2xls = require('json2xls');

const getExcelFilename = (type: string) => {
    return `${type}_${new Date()
        .toJSON()
        .replace(/[:.]/g, "_")
        }`;
}

export const exportTeams: RequestHandler = (req, res, next) => {
    const teams = get_teams();
    const filename = getExcelFilename('teams');
    (res as any).xls(filename + '.xlsx', teams);
}

export const exportParticipants: RequestHandler = (req, res, next) => {
    const participants = get_participants();
    const filename = getExcelFilename('participants');
    (res as any).xls(filename + '.xlsx', participants);
}