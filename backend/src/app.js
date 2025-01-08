const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookies());

// Signup API
app.post("/signup", async (req, res) => {
  try {
    // Validate signup data
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.send("User data saved successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Login api
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    // checking user is already in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Generate a jwt token
    const token = await user.getJWT();
    // add token in cookie and send response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });
    res.send("Login successful");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // Logic to send connection request goes here
  res.send("Sended connection request");
});

connectDB()
  .then(() => {
    console.log("Database Connected successfully!");
    app.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  })
  .catch((err) => console.log("Database Connection Failed!", err));
