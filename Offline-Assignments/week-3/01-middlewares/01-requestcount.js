const express = require("express");

const app = express();
let requestCount = 0;

function countPerRequest(req, res, next) {
  requestCount = requestCount + 1;
  console.log(requestCount);
  next();
}

app.use(countPerRequest);

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/requestCount", function (req, res) {
  res.status(200).json({ requestCount });
});

app.listen(3000);
module.exports = app;
