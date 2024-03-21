require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const z = require("zod");
const { User } = require("./model/Users");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const auth = require("./middleware/auth");

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Adarsh");
});

// Signup
app.post("/signup", async (req, res) => {
  const inputBody = req.body;
  const response = createUserSchema.safeParse(inputBody);
  const isExistingUser = await User.findOne({ email: response.data.email });

  if (isExistingUser) {
    return res.status(400).send("email already used");
  }

  // Create a new user
  const user = await User.create({
    username: response.data.username,
    email: response.data.email,
    password: response.data.password,
  });

  await user.save(); // Save the user to the database
  res.json({
    Message: "User created successfully",
  });
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.post("/login", async (req, res) => {
  const loginBody = req.body;
  const response = loginUserSchema.safeParse(loginBody);

  const isExistingUser = await User.findOne({ email: response.data.email });

  if (isExistingUser) {
    if (
      isExistingUser.email === response.data.email &&
      isExistingUser.password === response.data.password
    ) {
      jwt.sign(
        { id: isExistingUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "2m" },
        (err, token) => {
          if (err) {
            console.log(token);
            return res.json({ message: "Unable to set token" });
          }
          res
            .setHeader("Authorization", token)
            .send("Login Successful")
            .sendStatus(200);
        }
      );
    } else {
      return res.json({ message: "Invalid user email or password" });
    }
  } else {
    return res.status(403).json({
      message: "Unable to fetch user account registered with this email",
    });
  }
});

app.get("/:email/data", auth, async (req, res) => {
  const email = req.params.email;
  res.send(email).status(200);
});

main()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
