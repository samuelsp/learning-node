const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const basePath = path.join(__dirname, "templates");
const users = require("./users");

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
