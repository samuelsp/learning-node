require("dotenv").config();

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const flash = require("express-flash");

const FileStore = require("session-file-store")(session);

const app = express();

const PORT = process.env.PORT || 3000;
const conn = require("./db/conn");

// models
const Tought = require("./models/Tought");
const User = require("./models/User");

// routes
const toughtsRoutes = require("./routes/toughtsRoutes");
const authRoutes = require("./routes/authRoutes");

// controllers
const toughtsController = require("./controllers/toughtsController");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

session({
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function () {},
    path: require("path").join(require("os").tmpdir(), "sessions"),
  }),
  cookie: {
    secure: false,
    maxAge: 360000,
    expires: new Date(Date.now() + 360000),
    httpOnly: true,
  },
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);

app.get("/", toughtsController.showToughts);

app.use(flash());
app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  console.log(req.session.userId);
  if (req.session.userId) {
    res.locals = req.session;
  }
  next();
});

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados:", err.message);
  });
