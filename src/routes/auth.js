const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateSignUpData = require("../utils/validateSignUpData");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  try {
    // validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });

    await newUser.save();

    res.status(201).send("user registered successfully");
  } catch (error) {
    res.status(500).send("something went wrong 2=> " + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const isEmailValid = await User.find({ emailId: emailId });

    if (isEmailValid == false) {
      throw new Error("invalid credentials.....");
    } else {
      const isPasswordValid = isEmailValid[0].getBcryptPassword(password);
      if (isPasswordValid) {
        let jwtToken = await isEmailValid[0].getJWT();

        res.cookie("token", jwtToken);
        res
          .status(200)
          .json({
            message: "data found and user logged in successfully ",
            data: isEmailValid,
          });
      } else {
        throw new Error("invalid credentials...try again");
      }
    }
  } catch (error) {
    res.status(500).send("something went wrong => " + error);
  }
});

authRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("loggedout successfully");
});
module.exports = authRouter;
