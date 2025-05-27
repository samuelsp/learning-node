const express = require("express");
const users = require("./users");
const path = require("path");
const app = express();

const port = 5000;

const basePath = path.join(__dirname, "templates");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.use("/users", users);

app.use((req, res) => {
  res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
