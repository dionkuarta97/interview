const express = require("express");
const router = express.Router();
const error_handler = require("../middlewares/error_handler");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const upload = require("../middlewares/multer");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/check_email", UserController.checkEmail);
router.post("/forget_password", UserController.forgetPassword);
router.post("/submit_game_data/:gameId/:userId", UserController.submitGameData);
router.use(authentication);
router.get("/user", UserController.getUser);
router.post(
  "/upload_profile",
  upload.single("foto"),
  UserController.uploadProfile
);
router.post("/change_password", UserController.changePassword);
router.use(error_handler);

module.exports = router;
