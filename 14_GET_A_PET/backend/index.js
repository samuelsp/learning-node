const express = require("express");
const cors = require("cors");
const app = express();

// Config json response
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "*" }));

// Public folder for images
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "GET A PET" });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
