const { ObjectId } = require("mongodb");
const conn = require("../db/conn");

class Product {
  constructor(name, price, image, description) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  save() {
    const product = conn.db().collection("products").insertOne({
      name: this.name,
      price: this.price,
      image: this.image,
      description: this.description,
    });
    return product;
  }

  static getProducts() {
    const products = conn.db().collection("products").find().toArray();
    return products;
  }

  static async getProductById(id) {
    // if (!ObjectId.isValid(id)) {
    //   return null;
    // }
    const product = await conn
      .db()
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    return product;
  }
}

module.exports = Product;
