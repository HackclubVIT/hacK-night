#!/usr/bin/env node

import cors from "cors";
import express from "express";
import { register } from "./register";

express()
    .use(express.urlencoded({ extended: true }))
    .use(cors())
    .get("/api/health", (_, res) => res.send("OK"))
    .post("/api/register", register)
    .listen(process.env.PORT || 9000, () => console.log("Listening..."));
