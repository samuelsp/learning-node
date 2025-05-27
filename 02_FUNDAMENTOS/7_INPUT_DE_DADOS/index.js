const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual é o seu nome? ", (nome) => {
  readline.question("Qual é o seu sobrenome? ", (sobrenome) => {
    console.log(`Olá, ${nome} ${sobrenome}.`);
    readline.close();
  });
});
