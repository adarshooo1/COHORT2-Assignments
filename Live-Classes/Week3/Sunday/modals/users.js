const mongoose = require("mongoose");
const { Schema } = mongoose;

// Step 1: Create Schema and Export Model
const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      minLength: 12,
      maxLength: 60,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  { timestamps: true }
);

// Basically 'Users' will create a collection in the mongodb Database.s
exports.User = mongoose.model("Users", userSchema);
