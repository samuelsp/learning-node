const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("./db/conn");

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
  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ["title", "pagesqty", title, pages];
  pool.query(sql, data, (err) => {
    if (err) {
      console.log("Error inserting book: ", err.message);
      return;
    }
    res.redirect("/books");
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  pool.query(sql, (err, data) => {
    if (err) {
      console.log("Error get data from database: ", err.message);
      return;
    }
    const books = data;
    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ["id", id];
  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log("Error the get data from database: ", err.message);
      return;
    }
    const book = data[0];
    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ["id", id];
  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log("Error the get data from database: ", err.message);
      return;
    }
    const book = data[0];
    res.render("editbook", { book });
  });
});

app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pages = req.body.pagesqty;
  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const data = ["title", title, "pagesqty", pages, "id", id];
  pool.query(sql, data, (err) => {
    if (err) {
      console.log("Error updating book: ", err.message);
      return;
    }
    res.redirect("/books");
  });
});

app.post("/books/remove/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE ?? = ?`;
  const data = ["id", id];
  pool.query(sql, data, (err) => {
    if (err) {
      console.log("Error deleting book: ", err.message);
      return;
    }
    res.redirect("/books");
  });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
