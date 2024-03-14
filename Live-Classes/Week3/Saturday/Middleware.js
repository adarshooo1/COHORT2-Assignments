const express = require("express");
const zod = require("zod");
const port = 3000;
const bodyParser = require("body-parser"); //Body parser for the post request

// Zod Schema
const userSchema = zod.object({
  patientName: zod.string().min(1),
  Kidneys: zod.array(zod.object({ status: zod.string() })).length(2),
});

const app = express();
app.use(express.json());
app.use(bodyParser.json()); //To parse body of the port request we make.

// Middleware Start

// Request Calculator Middleware
let noOfRequest = 0;
function calculateRequest(req, res, next) {
  noOfRequest++;
  console.log(noOfRequest);
  next();
}

// User Authentication middleware
function authenticateUser(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if (!(username == "Adarsh" && password == "Adarsh@2002")) {
    res.json({ message: `username or password not authenticated` }).status(404);
    return;
  } else {
    next();
  }
}

// Request Time Middleware
function Timer(req, res, next) {
  let startTime = Date.now();

  res.on("finish", () => {
    let endTIme = Date.now();
    let timeTaken = endTIme - startTime;
    console.log(
      `## Requesting Url : ${req.url} - ## Result time: ${timeTaken} ms `
    );
  });

  next();
}
// Middleware end

// Routes Handler
app.get("/", calculateRequest, Timer, (req, res) => {
  res.json({ message: "Go to /login route" });
});

app.post("/login", calculateRequest, (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  if (username === "Adarsh" && password === "Adarsh@2002") {
    res.json({ message: `Welcome ${username}` }).status(200);
    next();
  } else {
    res.json({ message: "username or password not authenticated" }).status(404);
    return;
  }
});

// Get Patient Name
app.get(
  "/view-patient",
  calculateRequest,
  authenticateUser,
  Timer,
  (req, res) => {
    let PatientQueue = [];
    for (let i = 0; i < patients.length; i++) {
      PatientQueue.push(patients[i].patientName);
    }
    res.json({ patient: PatientQueue }).status(200);
  }
);

// Get Patient Info
app.get(
  "/view-patient/:patientName",
  calculateRequest,
  authenticateUser,
  Timer,
  (req, res) => {
    const patientName = req.params.patientName;

    let PatientInfo = [];
    const foundPatient = patients.find(
      (patient) => patient.patientName === patientName
    );
    if (foundPatient) {
      res.json({ Patient: foundPatient });
    } else {
      res.json({ message: `${patientName} not present` });
    }
  }
);

// Have to create logic for req.body
app.post("/health-checkup/", authenticateUser, Timer, (req, res) => {
  const Kidneys = req.body;

  const isValidKidneys =
    Array.isArray(Kidneys) &&
    Kidneys.length === 2 &&
    Kidneys.every((kidney) => {
      // if(kidney[0].status === 'good' && kidney[1].status === 'good'){
      // }
      return kidney.status && ["good", "bad"].includes(kidney.status);
    });

  if (!isValidKidneys) {
    return res.status(400).json({ message: "Invalid user detail" });
  } else {
    return res.status(200).json({ Kidneys: Kidneys });
  }
});

// Global Catches
app.use((err, req, res, next) => {
  console.error(err); // Log the error to console or logs
  res.status(500).json({ error: "Internal Server Error" }); // Send an error response
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// Sample Data
const patients = [
  {
    patientName: "Adarsh",
    Kidneys: [
      {
        status: "good",
      },
      {
        status: "good",
      },
    ],
  },
  {
    patientName: "Deepanshu",
    Kidneys: [
      {
        status: "good",
      },
      {
        status: "bad",
      },
    ],
  },
  {
    patientName: "Kelly",
    Kidneys: [
      {
        status: "bad",
      },
      {
        status: "good",
      },
    ],
  },
  {
    patientName: "Brenda",
    Kidneys: [
      {
        status: "bad",
      },
      {
        status: "bad",
      },
    ],
  },
];
