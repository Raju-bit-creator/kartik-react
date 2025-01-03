const express = require("express");
const app = express();
const dbConnect = require("./db");
const chats = require("./data/data");
const port = 4000;

dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/chats", (req, res) => {
  res.send(chats);
});
app.get("/chats/:id", (req, res) => {
  console.log(req.params.id);

  const singleChat = chats.find((c) => c._id === req.params.id);
  // console.log(singleChat);

  res.send(singleChat);
});

app.listen(port, () => {
  console.log(`api is listening on port: ${port}`);
});
