const router = require("express").Router();
const userController = require("./user.controller");
const { verifyAccessToken } = require("../../middleware/verifyAccessToken");

/* User Login */
router.post("/login", userController.loginUserHandler);

/* User Sign-up */
router.post("/sign-up", userController.signupUser);

/* Get All UserList */
router.get("/", verifyAccessToken, userController.getUser);

/* Get User By Id */
router.get("/:id", verifyAccessToken, userController.getUserFromId);

/* Edit User */
router.put("/edit-user/:id", verifyAccessToken, userController.editUser);

/* Delete User By Id */
router.delete("/:id", verifyAccessToken, userController.removeUser);

module.exports = router;
