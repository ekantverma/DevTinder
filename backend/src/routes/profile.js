const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit profile!");
    }

    const loggedUser = req.user;

    if (!loggedUser) {
      throw new Error("User not found!");
    }

    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    await loggedUser.save();

    res.json({
      message: `${loggedUser.firstName}, Your profile updated successfully!`,
      data: loggedUser,
    });
    
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
