import express from "express";
const router = express.Router();

import checkAuth from "../auth/check-auth";
import checkAdmin from "../auth/check-admin";

import { downloadReports } from "../controllers/reports";

//route to download reports of tickets closed in the last one month
router.get("/download", checkAuth, checkAdmin, downloadReports);

export = router;
