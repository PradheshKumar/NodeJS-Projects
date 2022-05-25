const fs = require("fs");
const http = require("http");
const url = require("url");
const ReplaceAll = require("./modules/replaceTemplate");

////
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else if (pathname === "/overview" || pathname === "/") {
    const output = dataObj.map((e) => ReplaceAll(tempCard, e));
    const tempOverview1 = tempOverview.replace(/{%PRODUCT_CARDS%}/g, output);
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    res.end(tempOverview1);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const output = ReplaceAll(tempProduct, dataObj[query.id]);
    res.end(output);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>PAGE NOT FOUND</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening at 8000");
});
