import express from "express";
const router = express.Router();

import {
  users_get_all,
  users_register_user,
  users_login_user,
  users_get_user,
  users_delete_user,
  users_update_user_role,
  users_get_logged_in_user_profile,
} from "../controllers/users";

import checkAuth from "../auth/check-auth";
import checkAdmin from "../auth/check-admin";

//route to get all users
router.get("/", checkAuth, checkAdmin, users_get_all);

//route to regiiser a user
router.post("/register", users_register_user);

//route to login a user
router.post("/login", users_login_user);

//route to get logged in user profile
router.get("/profile", checkAuth, users_get_logged_in_user_profile);

//route to get a particular user
router.get("/:userId", checkAuth, users_get_user);

//route to delete a particular user
router.delete("/:userId", checkAuth, users_delete_user);

//route to update the role of a user (admin,supervisor,basic)
router.patch("/:userId/role", checkAuth, checkAdmin, users_update_user_role);

export = router;
