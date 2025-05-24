const mongoose = require("mongoose");
async function main() {
  await mongoose.connect("mongodb://localhost:27017/dbmongonode");
  console.log("Connected to MONGOOSE");
}

main().catch((err) => console.log(err));
module.exports = mongoose;
