"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const check_auth_1 = __importDefault(require("../auth/check-auth"));
const auth_role_1 = __importDefault(require("../auth/auth-role"));
const role_1 = __importDefault(require("../auth/role"));
const reports_1 = require("../controllers/reports");
//route to download reports of tickets closed in the last one month
router.get("/download", check_auth_1.default, auth_role_1.default(role_1.default.ADMIN, role_1.default.AGENT), reports_1.downloadReports);
module.exports = router;
//# sourceMappingURL=reports.js.map