const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/createProduct", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name) {
    res.status(422).json({
      message: "O nome do produto é obrigatório!",
    });
    return;
  }

  if (!price) {
    res.status(422).json({
      message: "O preço do produto é obrigatório!",
    });
    return;
  }

  res
    .status(201)
    .json({ message: `O produto ${name} foi criado com sucesso!` });
});

app.listen(3000, () => {
  console.log("Api is running on port 3000");
});
