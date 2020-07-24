import express from "express";
const router = express.Router();


import checkAuth from "../auth/check-auth";
import authRole from "../auth/auth-role";

import role from "../auth/role";


import { downloadReports } from "../controllers/reports";

//route to download reports of tickets closed in the last one month
router.get(
  "/download",
  checkAuth,
  authRole(role.ADMIN, role.AGENT),
  downloadReports
);

export = router;
