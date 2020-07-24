"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_1 = require("../controllers/users");
const check_auth_1 = __importDefault(require("../auth/check-auth"));
const auth_role_1 = __importDefault(require("../auth/auth-role"));
const role_1 = __importDefault(require("../auth/role"));
//route to get all users
router.get("/", check_auth_1.default, auth_role_1.default(role_1.default.ADMIN, role_1.default.AGENT), users_1.users_get_all);
//route to regiiser a user
router.post("/register", users_1.users_register_user);
//route to login a user
router.post("/login", users_1.users_login_user);
//route to get a particular user
router.get("/:userId", check_auth_1.default, users_1.users_get_user);
//route to delete a particular user
router.delete("/:userId", check_auth_1.default, users_1.users_delete_user);
//route to update the role of a user (admin,supervisor,bsic)
router.patch("/:userId/role", check_auth_1.default, auth_role_1.default(role_1.default.ADMIN), users_1.users_update_user_role);
module.exports = router;
//# sourceMappingURL=users.js.map