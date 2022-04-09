import { RequestHandler } from "express";
import { get_registration_counts } from "./db";

export const authCheck: RequestHandler = (req, res, next) => {
    const { key } = req.body;
    if (!process.env.HN_DASH_PASSWORD) return next({ status: 500 });
    if (!key) return next({ status: 400 });
    if (key !== process.env.HN_DASH_PASSWORD) return next({ status: 403 });

    return next();
}

export const summary: RequestHandler = (req, res, next) => {
    const counts = get_registration_counts();
    res.send(counts);
}