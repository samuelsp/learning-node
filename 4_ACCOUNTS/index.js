const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs");

operation();

function createAccount() {
  console.log(chalk.bgGreen.black("Obrigado por escolher o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta:"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para a sua conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black(
            "Esta conta já existe. Por favor, escolha outro nome."
          )
        );

        setTimeout(() => {
          buildAccount();
        }, 3000);

        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns, sua conta foi criada!"));

      setTimeout(() => {
        operation();
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
    });
}

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer.action;
      if (action === "Criar conta") {
        createAccount();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Consultar saldo") {
        getAccountBalance();
      } else if (action === "Sacar") {
        withDraw();
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar o nosso banco!"));
        process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        console.log(chalk.bgRed.black("Esta conta não existe."));
        answer["accountName"] = "";
        return deposit();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto deseja depositar:",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde.")
    );
    return deposit();
  }

  accountData.balance = parseFloat(accountData.balance) + parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`)
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        console.log(chalk.bgRed.black("Esta conta não existe."));
        return getAccountBalance();
      }
      const accountData = getAccount(accountName);
      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$ ${accountData.balance}.`
        )
      );
      operation();
    })
    .catch((err) => {
      console.log(err);
    });
}

function withDraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkAccount(accountName)) {
        console.log(chalk.bgRed.black("Esta conta não existe."));
        return withDraw();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto você deseja sacar:",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          removeAmount(accountName, amount);
          operation();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(
      chalk.bgRed.black("Ocorreu um erro, tente novamente mais tarde.")
    );
    return withDraw();
  }
  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Saldo insuficiente."));
    return;
  }
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi realizado saque no valor de R$${amount} da sua conta!`)
  );
}
