import express from "express";
const router = express.Router();

import checkAuth from "../auth/check-auth";
import authRole from "../auth/auth-role";

import role from "../auth/role";


import {
  tickets_get_all,
  tickets_create_ticket,
  tickets_get_ticket,
  tickets_for_a_user,
  tickets_delete_ticket,
  tickets_update_ticket_status,
} from "../controllers/tickets";

//route to get all tickets
router.get("/", checkAuth, authRole(role.ADMIN, role.AGENT), tickets_get_all);

//route to create a ticket
router.post("/", checkAuth, tickets_create_ticket);

//route to get a particular ticket
router.get("/:ticketId", checkAuth, tickets_get_ticket);

//route to get all tickets assigned to a particular user
router.get("/user/:userId", checkAuth, tickets_for_a_user);

//route to delete a ticket
router.delete("/:ticketId", checkAuth, tickets_delete_ticket);

//route to update the status of a ticket (open or close)
router.patch(
  "/:ticketId/status",
  checkAuth,
  authRole(role.ADMIN),
  tickets_update_ticket_status
);

export = router;
