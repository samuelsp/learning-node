const chalk = require("chalk");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { name: "nome", message: "Informe o seu nome:" },
    { name: "idade", message: "Informe a sua idade:" },
  ])
  .then((answers) => {
    try {
      const nome = answers.nome;
      const idade = parseInt(answers.idade);

      if (!nome || !idade) {
        throw new Error("O nome ou a idade não foram informados.");
      }

      if (!Number.isInteger(idade)) {
        throw new Error(
          "Idade inválida. Informe um número inteiro maior que 0."
        );
      }

      console.log(
        chalk.bgYellow.black(`Olá, ${nome}. Você tem ${idade} anos.`)
      );
    } catch (error) {
      console.error(chalk.red(error.message));
    }
  })
  .catch((err) => {
    console.error(chalk.red(err));
  });
