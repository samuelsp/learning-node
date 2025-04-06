const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.login);
router.get("/register", authController.register);
router.get("/logout", authController.logout);
router.post("/register", authController.registerPost);

module.exports = router;
