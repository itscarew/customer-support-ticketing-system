"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const check_auth_1 = __importDefault(require("../auth/check-auth"));
const check_admin_1 = __importDefault(require("../auth/check-admin"));
const reports_1 = require("../controllers/reports");
//route to download reports of tickets closed in the last one month
router.get("/download", check_auth_1.default, check_admin_1.default, reports_1.downloadReports);
module.exports = router;
//# sourceMappingURL=reports.js.map