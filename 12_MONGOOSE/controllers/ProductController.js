const Product = require("../models/Product");

module.exports = class ProductController {
  static async showProducts(req, res) {
    const products = await Product.find({}).lean();
    res.render("products/all", { products });
  }

  static createProduct(req, res) {
    res.render("products/create");
  }

  static async createProductPost(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;

    const product = new Product({ name, price, image, description });

    await product.save();

    res.redirect("/");
  }

  static async getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id).lean();
    res.render("products/product", { product });
  }

  static async removeProduct(req, res) {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    res.redirect("/");
  }

  static async editProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id).lean();
    res.render("products/edit", { product });
  }

  static async editProductPost(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const product = { name, price, image, description };

    await Product.updateOne({ _id: id }, product);
    res.redirect("/");
  }
};
