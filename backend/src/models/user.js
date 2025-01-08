const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error(
            "Gender should be either'male', 'female', or 'others'"
          );
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://i.pinimg.com/736x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL format" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about!",
    },
    skills: [String],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ id: user._id }, "Dev@Tinder$3000", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHashed = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHashed
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
