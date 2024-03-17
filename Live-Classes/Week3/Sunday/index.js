const express = require("express");
const bodyParser = require("body-parser");
const z = require("zod");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const JWT_SECRET = "helloworld";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// New user schema:
const newUserSchema = z.object({
  name: z.string().min(3, { message: "Must be 3 or more characters long" }),
  username: z.string().toLowerCase(),
  password: z.string(),
});

// Login user schema
const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Sample data for users
const ALL_USER = [
  {
    name: "Adarsh Singh",
    username: "adarhsinghakooo1",
    password: "adnaoe;bfwaeo",
  },
  {
    name: "Deepu Chauhan",
    username: "deepuchauhan1901",
    password: ";idhaifwaeo",
  },
  {
    name: "Rajveer Sishodiya",
    username: "rajveersiodhiya",
    password: ";djpJDE0rasd",
  },
];

// Function to check if a user already exists
function isExistingUser(username) {
  return ALL_USER.some((user) => user.username === username);
}

// Route for user registration
app.post("/register", (req, res) => {
  const newUser = req.body;
  const response = newUserSchema.safeParse(newUser);

  // Check if the username already exists
  if (!isExistingUser(response.data.username)) {
    // Generate JWT token for the registered user
    jwt.sign(
      { username: response.data.username },
      JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.json({ Error: err }).sendStatus(401);
        }
        // Add the new user to the list of users
        ALL_USER.push(response.data);
        // Respond with the generated token
        res.json({ token: token }).status(200);
      }
    );
  } else {
    // If the username already exists, return an error message
    return res.json({ message: "User Already Exist" }).redirect("/login");
  }
});

// Route for user login
app.post("/login", (req, res) => {
  const loginUser = req.body;
  const response = loginUserSchema.safeParse(loginUser);

  // Check if the user exists and credentials match
  const user = ALL_USER.find(
    (user) =>
      user.username === response.data.username &&
      user.password === response.data.password
  );

  if (user) {
    // Generate JWT token for the logged-in user
    jwt.sign(
      {
        name: user.name,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
      (err, loggedInUserToken) => {
        if (err) {
          return res.json({ "Token creation error": err });
        }
        // Respond with the generated token
        res.json({ Token: loggedInUserToken });
      }
    );
  } else {
    // If login credentials are invalid, return an error message
    res.json({
      "Login Invalid": "Please create a new account at /register route",
    });
  }
});

// Middleware to check authorization
function checkAuthorization(req, res, next) {
  const authorizationToken = req.headers.authorization;

  if (authorizationToken !== "undefined") {
    jwt.verify(authorizationToken, JWT_SECRET, (err, tokenData) => {
      if (err) {
        res.json({ message: "un valid user token" });
      }
      req.decoded = tokenData;
      next();
    });
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
}

// Route to get profile information of a logged-in user
app.get("/:username/about", checkAuthorization, (req, res) => {
  const tokenData = req.decoded;
  const loggedInUsername = tokenData.username;
  const requestedUsername = req.params.username;

  if (loggedInUsername === requestedUsername) {
    const user = ALL_USER.find((user) => user.username === requestedUsername);
    if (user) {
      res.json({ name: user.name, username: user.username });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.status(403).json({ error: "Unauthorized access" });
  }
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);