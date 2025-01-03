const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;
const User = require("./models/user");

// Creating a post api
app.post("/signup", async (re, res) => {
  // Creating a new instance of the user model
  const user = new User({
    firstName: "Ekant",
    lastName: "Verma",
    email: "Ekant@gmail.com",
    password: "Ekant@",
    age: 18,
    gender: "Male",
  });
  try {
    await user.save();
    res.send("User data saved successfully");
  } catch (err) {
    console.error("Error while saving user data:", err);
    res.status(500).send("Server Error");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connected successfully!");
    app.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  })
  .catch((err) => console.log("Database Connection Failed!", err));
