const express = require("express");
const app = express();

app.use(express.json());

// Way 1:
// Act like a middleware
function isOldEnough(age) {
  if (age < 18) {
    return false;
  } else {
    return true;
  }
}

app.get("/ride1", (req, res) => {
  if (isOldEnough(req.query.age)) {
    res.json({ message: "able to ride at ride1" });
  } else {
    return res.json({ message: "Unable to ride at any ride" });
  }
});

app.get("/ride2", (req, res) => {
  if (isOldEnough(req.query.age)) {
    res.json({ message: "able to ride at ride2" });
  } else {
    return res.json({ message: "Unable to ride at any ride" });
  }
});

// Way 2
// Middleware:
function isOldEnoughMiddleware(req, res, next) {
  const age = req.query.age;

  if (age < 18) {
  } else {
    return res.json({ message: "Unable to ride at any ride" });
    next();
  }
}

// Way 3:
// This will be applied on the whole app. and order matters as well with app.use()
app.use(isOldEnoughMiddleware);

app.get("/ride1", isOldEnoughMiddleware, (req, res) => {
  res.json({ message: "able to ride at ride1" });
});

app.get("/ride2", isOldEnoughMiddleware, (req, res) => {
  res.json({ message: "able to ride at ride2" });
});

app.listen(3000, () => {
  console.log("Started");
});
