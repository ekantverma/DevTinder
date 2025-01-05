const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;
const User = require("./models/user");

app.use(express.json());

// Creating a post api
app.post("/signup", async (req, res) => {
  // Creating a new instance of the user model
  const user = new User(req.body);
  console.log(req.body);
  try {
    await user.save();
    res.send("User data saved successfully");
  } catch (err) {
    console.error("Error while saving user data:", err);
    res.status(500).send("Server Error");
  }
});

// Get api to find user by email from database
app.get("/user", async (req, res) => {
  try{
    const email = req.body.email;
    const users = await User.find({email : email});
    res.send(users);
  } catch(err){
    res.status(404).send("User not found");
  }
})

// Feed Api get all user from the database
app.get("/feed", async (req, res) => {
  try{
    const feed = await User.find();
    res.send(feed);
  } catch(err){
    res.status(404).send("Feed is empty");
  }
})

// Delete user from database
app.delete("/user", async (req, res) => {
  try{
    const emailId = res.body.email;
    const user = await User.findByIdAndDelete(emailId);
    res.send(emailId + "User deleted");
  }
  catch(err) {
    res.status(404).send("Something went wrong");
  }
})



connectDB()
  .then(() => {
    console.log("Database Connected successfully!");
    app.listen(port, () => {
      console.log("Server listening on port " + port);
    });
  })
  .catch((err) => console.log("Database Connection Failed!", err));
