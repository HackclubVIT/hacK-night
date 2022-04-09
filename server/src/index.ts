#!/usr/bin/env node

import cors from "cors";
import express, { json, response } from "express";
import { register } from "./register";
import { authCheck, summary } from "./dash";
import { exportParticipants, exportTeams } from './export'
const json2xls = require('json2xls');

express()
    .use(express.urlencoded({ extended: true }))
    .use(json2xls.middleware)
    .use(cors())
    .get("/dashboard", (req, res, next) => res.sendFile("html/dashboard.html", { root: process.cwd() }))
    .get("/api/health",
        (_, res) => res.send("OK"))
    .post("/api/register", register)
    .use("/api/admin", authCheck)
    .post("/api/admin/summary", summary)
    .post("/api/admin/export/teams", exportTeams)
    .post("/api/admin/export/participants", exportParticipants)
    .listen(process.env.PORT || 9000, () => console.log("Listening..."));
