const express = require("express");
const router = express.Router();
const toughtsController = require("../controllers/toughtsController");
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/", checkAuth, toughtsController.showToughts);
router.get("/add", checkAuth, toughtsController.createTought);
router.post("/add", checkAuth, toughtsController.createToughtSave);
router.get("/edit/:id", checkAuth, toughtsController.updateTought);
router.post("/edit", checkAuth, toughtsController.updateToughtSave);
router.post("/remove", checkAuth, toughtsController.removeTought);
router.get("/dashboard", checkAuth, toughtsController.dashboard);

module.exports = router;
