const express = require("express");
const exphbs = require("express-handlebars");

const PORT = 3000;
const app = express();

const conn = require("./db/conn");
const User = require("./models/User");
const Address = require("./models/Address");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render("home", { users });
});

app.get("/users/create", (req, res) => {
  res.render("adduser");
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id } });
  console.log(user);
  res.render("userview", { user });
});

app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ include: Address, where: { id: id } });
  res.render("useredit", { user: user.get({ plain: true }) });
});

app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  }

  await User.create({ name, occupation, newsletter });
  res.redirect("/");
});

app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id } });
  res.redirect("/");
});

app.post("/users/update", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  await User.update(userData, { where: { id } });
  res.redirect("/");
});

app.post("/address/create", async (req, res) => {
  const userId = req.body.userId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = {
    userId,
    street,
    number,
    city,
  };

  await Address.create(address);
  res.redirect(`/users/edit/${userId}`);
});

app.post("/address/delete/", async (req, res) => {
  const id = req.body.id;
  const userId = req.body.userId;
  await Address.destroy({ where: { id: id } });
  res.redirect(`/users/edit/${userId}`);
});

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
