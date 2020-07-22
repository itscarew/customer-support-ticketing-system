const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const authRole = require("../auth/auth-role");

const role = require("../auth/role");

const downloads = require("../controllers/reports");

//route to download reports of tickets closed in the last one month
router.get(
  "/download",
  checkAuth,
  authRole(role.ADMIN, role.AGENT),
  downloads.downloadReports
);

module.exports = router;
