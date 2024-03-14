const users = [
  {
    name: "Adarsh",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

app.get("/all", (req, res) => {
  res.json(users).status(200);
});

// Get Method
app.get("/", (req, res) => {
  const patientName = users[0].name;

  const Kidney = users[0].kidneys.length;

  // Way 2
  let NumberOfUnHealthyKidney = 0;

  for (let i = 0; i < Kidney; i++) {
    if (users[0].kidneys[i].healthy === false) {
      NumberOfUnHealthyKidney = NumberOfUnHealthyKidney + 1;
    }
  }
  console.log("Number of Unhealthy : ", NumberOfUnHealthyKidney);

  // Calculation Healthy kidney;
  const numberOfHealthyKidney = Kidney - NumberOfUnHealthyKidney;
  console.log("Number of Healthy : ", NumberOfUnHealthyKidney);

  // // Way 2
  // const FilterKidney = users[0].kidneys.filter(
  //   (kidney) => kidney.healthy == true
  // ).length;

  let totalHealthyKidney = 0;
  let totalUnHealthyKidney = 0;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy === true) {
      totalHealthyKidney += 1;
    } else {
      totalUnHealthyKidney += 1;
    }
  }

  console.log(
    `Healthy Kidney : ${totalHealthyKidney} , Unhealthy Kidney : ${totalUnHealthyKidney}`
  );

  res
    .setHeader("Content-type", "application/json")
    // .send(`name : ${patientName} Healthy Kidney : ${FilterKidney}`)
    .json({
      name: patientName,
      "Healthy Kidney": numberOfHealthyKidney,
      "Unhealthy Kidney": NumberOfUnHealthyKidney,
    })
    .status(200);
});

// Post Method
app.post("/", (req, res) => {
  const newPatient = req.body;
  users.push(newPatient);
  res.json("Added User Successful");
});

// Patch Method
app.put("/", (req, res) => {
  const replaceKidney = req.body.replaceKidney;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy === false) {
      users[0].kidneys[i].healthy = replaceKidney;
    }
  }
  res.json("Kidney Replaced");
});

function checkKidneyCount() {
  let hasToImplantKidney = false;
  if (users[0].kidneys.length !== 2 && users[0].kidneys.length < 2) {
    hasToImplantKidney = true;
  }
  return hasToImplantKidney;
}

app.patch("/", (req, res) => {
  let insertKidney = req.body;

  if (checkKidneyCount()) {
    users[0].kidneys.push(insertKidney);
    res.json({ message: "Kidney Implant Successful" });
  }

  res.json({ message: "No Missing Kidney" });
});

// Delete
app.delete("/", (req, res) => {
  if (checkIsUnhealthyKidney()) {
    const remainingKidney = [];
    users[0].kidneys.filter((isHealthy) => {
      if (isHealthy.healthy === true) {
        remainingKidney.push({
          healthy: true,
        });
      }
    });
    users[0].kidneys = remainingKidney;
    res.json({ message: "Removed Unhealthy Kidney Successfully" });
  } else {
    res.json({ message: "No unhealthy Kidney" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function checkIsUnhealthyKidney() {
  let atLeastOneUnhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atLeastOneUnhealthyKidney = true;
    }
  }
  return atLeastOneUnhealthyKidney;
}
