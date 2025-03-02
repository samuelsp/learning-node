const minimist = require("minimist");
const add = require("../1_MODULO_INTERNO/math_operations").add;

const args = minimist(process.argv.slice(2));

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

console.log(add(a, b));
