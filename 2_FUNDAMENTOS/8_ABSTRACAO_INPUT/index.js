const chalk = require("chalk");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { name: "p1", message: "Informe o valor da primeira nota:" },
    { name: "p2", message: "Informe o valor da segunda nota:" },
  ])
  .then((answers) => {
    // console.log(answers);
    const p1 = parseFloat(answers.p1);
    const p2 = parseFloat(answers.p2);
    const media = (p1 + p2) / 2;
    console.log(`A média do aluno é ${media}.`);
    console.log("Situação do aluno:");
    if (media >= 7) {
      console.log(chalk.green("Aprovado!"));
    } else {
      console.log(chalk.red("Reprovado!"));
    }
  })
  .catch((err) => {
    console.error(err);
  });
