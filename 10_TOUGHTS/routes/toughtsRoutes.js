const express = require("express");
const router = express.Router();
const toughtsController = require("../controllers/toughtsController");

router.get("/", toughtsController.showToughts);

module.exports = router;
