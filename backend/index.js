const express = require("express");
const app = express();
const dbConnect = require("./db");
const port = 4000;

dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about-us", (req, res) => {
  res.send("this is about us page");
});
app.get("/contact-us", (req, res) => {
  res.send("this is contact us page");
});

app.listen(port, () => {
  console.log(`api is listening on port: ${port}`);
});
