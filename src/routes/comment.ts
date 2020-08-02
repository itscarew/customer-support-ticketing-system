import express from "express";
import {
  comments_get_all,
  comments_create_comment,
  comments_get_comment,
  comments_for_a_ticket,
  comments_delete_comment,
} from "../controllers/comments";
const router = express.Router();

import checkAuth from "../auth/check-auth";
import checkAdmin from "../auth/check-admin";

//route to get all comments
router.get("/", checkAuth, checkAdmin, comments_get_all);

//route to post a single comment
router.post("/ticket/:ticketId", checkAuth, comments_create_comment);

//route to get a particular comment
router.get("/:commentId", checkAuth, comments_get_comment);

//route to get all comments assigned to a particular ticket
router.get("/ticket/:ticketId", checkAuth, comments_for_a_ticket);

//route to delete a comment
router.delete("/:commentId", checkAuth, comments_delete_comment);

export = router;
