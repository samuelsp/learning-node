const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const PORT = 3000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));

const products = [
  {
    id: 0,
    name: "Laptop",
    price: 1000,
    quantity: 3,
  },
  {
    id: 1,
    name: "IPhone",
    price: 500,
    quantity: 5,
  },
  {
    id: 2,
    name: "Tablet",
    price: 300,
    quantity: 10,
  },
];

app.get("/", (req, res) => {
  res.render("home", { products });
});

app.get("/product/:id", (req, res) => {
  const product = products[req.params.id];
  res.render("product", { product });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
