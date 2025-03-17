const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const PORT = 3000;

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pages = req.body.pagesqty;

  const sql = `INSERT INTO books (title, pagesqty) VALUES ('${title}', ${pages})`;
  conn.query(sql, (err) => {
    if (err) {
      console.log("Error inserting book: ", err);
      return;
    }
    res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  conn.query(sql, (err, data) => {
    if (err) {
      console.log("Error get data from database: ", err);
      return;
    }
    const books = data;
    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.log("Error get data from database: ", err);
      return;
    }
    const book = data[0];
    res.render("book", { book });
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin@01",
  database: "nodemysql",
});

conn.connect((err) => {
  if (err) {
    console.log("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");

  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000");
  });
});
