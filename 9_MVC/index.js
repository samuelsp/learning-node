const express = require("express");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;
const app = express();

const conn = require("./db/conn");
//Models
const Task = require("./models/Task");
//Routes
const taskRoutes = require("./routes/tasksRoutes");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use("/tasks", taskRoutes);

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
