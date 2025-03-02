const http = require("http");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (!name) {
    res.end(
      "<h1>Preencha seu nome:</h1><form method='GET'><input type='text' name='name'><input type='submit' value='Enviar'></form>"
    );
  } else {
    res.end(`<h1>Seja bem-vindo(a), ${name}!</h1>`);
  }
});

server.listen(port, () => {
  console.log(`Servidor running on port ${port}`);
});
