const fs = require("fs"); // file system

fs.readFile("arquivo.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo");
    console.error(err);
    return;
  }
  console.log(data);
});
