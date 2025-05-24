const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.showProducts);
router.post("/edit", ProductController.editProductPost);
router.post("/create", ProductController.createProductPost);
router.get("/create", ProductController.createProduct);
router.get("/:id", ProductController.getProduct);
router.get("/edit/:id", ProductController.editProduct);
router.post("/remove/:id", ProductController.removeProduct);

module.exports = router;
