"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const check_auth_1 = __importDefault(require("../auth/check-auth"));
const check_admin_1 = __importDefault(require("../auth/check-admin"));
const tickets_1 = require("../controllers/tickets");
//route to get all tickets
router.get("/", check_auth_1.default, check_admin_1.default, tickets_1.tickets_get_all);
//route to create a ticket
router.post("/", check_auth_1.default, tickets_1.tickets_create_ticket);
//route to get a particular ticket
router.get("/:ticketId", check_auth_1.default, tickets_1.tickets_get_ticket);
//route to get all tickets assigned to a particular user
router.get("/user/:userId", check_auth_1.default, tickets_1.tickets_for_a_user);
//route to delete a ticket
router.delete("/:ticketId", check_auth_1.default, tickets_1.tickets_delete_ticket);
//route to update the status of a ticket (open or close)
router.patch("/:ticketId/status", check_auth_1.default, check_admin_1.default, tickets_1.tickets_update_ticket_status);
module.exports = router;
//# sourceMappingURL=tickets.js.map