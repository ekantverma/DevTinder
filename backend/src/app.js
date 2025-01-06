const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;
const User = require("./models/user");
const {validateSignupData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const validator = require("validator");

app.use(express.json());

// Signup API
app.post("/signup", async (req, res) => {
  try {
    // Validate signup data
    validateSignupData(req);

    const {firstName, lastName, email, password} = req.body;

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Creating a new instance of the user model
    const user = new User({
      firstName, lastName, email, password: hashedPassword
    });

    await user.save();
    res.send("User data saved successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// Login api
app.post("/login", async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!validator.isEmail(email)){
      throw new error("Invalid email");
    }
    // checking user is already in the database
    const user = await User.findOne({email: email});
    if(!user){
      throw new error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      res.send("Login successful");
    }else {
      throw new error("Invalid credentials");
    }

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
})

// Get api to find user by email from database
app.get("/user", async (req, res) => {
  try {
    const email = req.body.email;
    const users = await User.find({ email: email });
    res.send(users);
  } catch (err) {
    res.status(404).send("User not found");
  }
});

// Feed Api get all user from the database
app.get("/feed", async (req, res) => {
  try {
    const feed = await User.find();
    res.send(feed);
  } catch (err) {
    res.status(404).send("Feed is empty");
  }
});

// Delete user from database
app.delete("/user", async (req, res) => {
  try {
    const userId = res.body;
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// Update user in database
app.patch("/user/:userId", async (req, res) => {
  const userId = req?.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATE = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "skills",
      "password",
      "photoUrl",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new error("Update is not allowed for this query!");
    }
    if (data.skills && data.skills.length > 15) {
      throw new Error("More skills not allowed");
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updatedUser);
  } catch (err) {
    console.error("Error while updating user data:", err);
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
