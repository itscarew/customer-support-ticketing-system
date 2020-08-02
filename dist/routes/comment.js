"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const comments_1 = require("../controllers/comments");
const router = express_1.default.Router();
const check_auth_1 = __importDefault(require("../auth/check-auth"));
const check_admin_1 = __importDefault(require("../auth/check-admin"));
//route to get all comments
router.get("/", check_auth_1.default, check_admin_1.default, comments_1.comments_get_all);
//route to post a single comment
router.post("/ticket/:ticketId", check_auth_1.default, comments_1.comments_create_comment);
//route to get a particular comment
router.get("/:commentId", check_auth_1.default, comments_1.comments_get_comment);
//route to get all comments assigned to a particular ticket
router.get("/ticket/:ticketId", check_auth_1.default, comments_1.comments_for_a_ticket);
//route to delete a comment
router.delete("/:commentId", check_auth_1.default, comments_1.comments_delete_comment);
module.exports = router;
//# sourceMappingURL=comment.js.map