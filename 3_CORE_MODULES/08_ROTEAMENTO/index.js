const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 3000;
const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true);
  const filename = query.pathname.substring(1);
  console.log(filename);

  if (filename.includes("html")) {
    if (fs.existsSync(filename)) {
      fs.readFile(filename, (err, data) => {
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      fs.readFile("404.html", (err, data) => {
        res.writeHead(404, { "Content-type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.write("<h1>404 - Not Found</h1>");
    return res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
