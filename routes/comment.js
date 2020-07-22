const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const authRole = require("../auth/auth-role");

const role = require("../auth/role");

const CommentControllers = require("../controllers/comments");

//route to get all comments
router.get(
  "/",
  checkAuth,
  authRole(role.ADMIN, role.AGENT),
  CommentControllers.comments_get_all
);

//route to post a single comment
router.post("/", checkAuth, CommentControllers.comments_create_comment);

//route to get a particular comment
router.get("/:commentId", checkAuth, CommentControllers.comments_get_comment);

//route to get all comments assigned to a particular ticket
router.get(
  "/ticket/:ticketId",
  checkAuth,
  CommentControllers.comments_for_a_ticket
);

//route to delete a comment
router.delete(
  "/:commentId",
  checkAuth,
  CommentControllers.comments_delete_comment
);

module.exports = router;
