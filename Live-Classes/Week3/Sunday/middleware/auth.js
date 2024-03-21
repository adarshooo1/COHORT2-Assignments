require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../model/Users");
// Protected Route
const auth = async (req, res, next) => {
  try {
    // Step 1: Get token from Authorization header
    const token = req.headers.Authorization;

    // Step 2: Check if token exists
    if (!token || token === "undefined") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }

    // Step 3: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Step 4: Find user by ID
    const user = await User.findOne({ _id: decoded.id });

    // Step 5: Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Step 6: If user.id and decoded.id will same only in that case auth is proceed
    if (user.id === decoded.id) {
      next();
    }
  } catch (error) {
    // Handle JWT verification errors
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = auth;
