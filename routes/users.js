const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const authRole = require("../auth/auth-role");

const role = require("../auth/role");

const UserControllers = require("../controllers/users");

//route to get all users
router.get(
  "/",
  checkAuth,
  authRole(role.ADMIN, role.AGENT),
  UserControllers.users_get_all
);

//route to regiiser a user
router.post("/register", UserControllers.users_register_user);

//route to login a user
router.post("/login", UserControllers.users_login_user);

//route to get a particular user
router.get("/:userId", checkAuth, UserControllers.users_get_user);

//route to delete a particular user
router.delete("/:userId", checkAuth, UserControllers.users_delete_user);

//route to update the role of a user (admin,supervisor,bsic)
router.patch(
  "/:userId/role",
  checkAuth,
  authRole(role.ADMIN),
  UserControllers.users_update_user_role
);

module.exports = router;
