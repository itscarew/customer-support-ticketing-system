const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const authRole = require("../auth/auth-role");

const role = require("../auth/role");

const TicketControllers = require("../controllers/tickets");

//route to get all tickets
router.get(
  "/",
  checkAuth,
  authRole(role.ADMIN, role.AGENT),
  TicketControllers.tickets_get_all
);

//route to create a ticket
router.post("/", checkAuth, TicketControllers.tickets_create_ticket);

//route to get a particular ticket
router.get("/:ticketId", checkAuth, TicketControllers.tickets_get_ticket);

//route to get all tickets assigned to a particular user
router.get("/user/:userId", checkAuth, TicketControllers.tickets_for_a_user);

//route to delete a ticket
router.delete("/:ticketId", checkAuth, TicketControllers.tickets_delete_ticket);

//route to update the status of a ticket (open or close)
router.patch(
  "/:ticketId/status",
  checkAuth,
  authRole(role.ADMIN),
  TicketControllers.tickets_update_ticket_status
);

module.exports = router;
