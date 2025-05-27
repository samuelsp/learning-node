const fs = require("fs");
const url = require("url");
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;

  res.statusCode = 200;
  res.setHeader("Content-type", "text/html");

  if (!name) {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end("File not found!");
        console.log(err.message);
        return;
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  } else {
    const nameNewLine = name + ",\r\n";

    fs.appendFile("arquivo.txt", nameNewLine, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal server error");
        console.log(err);
        return;
      } else {
        res.writeHead(302, {
          Location: "/",
        });
        res.write("File created");
        return res.end();
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
