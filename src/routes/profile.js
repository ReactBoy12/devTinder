const express = require("express");
const { userLoginAuth } = require("../middlewares/auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
profileRouter.get("/profile", userLoginAuth, async (req, res) => {
  try {
    const authData = req.authData;
    res.status(200).send(authData);
  } catch (error) {
    res.status(500).send("something went wrong => " + error);
  }
});

profileRouter.patch("/profile/edit", userLoginAuth, async (req, res) => {
  try {
    const isEditValid = Object.keys(req.body).every((field) => {
      return ["age", "gender", "skills", "profileImage"].includes(field);
    });
    if (isEditValid) {
      Object.keys(req.body).map((fields) => {
        return (req.authData[fields] = req.body[fields]);
      });
      const updatedFields = await req.authData.save();
      res
        .status(200)
        .json({ message: "user updated successfully", data: updatedFields });
    } else {
      throw new Error("updation failed..");
    }
  } catch (error) {
    res.send("something went wrong" + error);
  }
});

profileRouter.patch("/profile/password", userLoginAuth, async (req, res) => {
  try {
    const { emailId, password, confirmPassword } = req.body;

    if (emailId == req.authData.emailId) {
      if (password == confirmPassword) {
        const hashedUpdatedPassword = await bcrypt.hash(confirmPassword, 10);
        req.authData.password = hashedUpdatedPassword;
        const updatedPasswordField = await req.authData.save();
        res.json({ message: "password updated", data: updatedPasswordField });
      } else {
        throw new Error(" wrong credentials");
      }
    } else {
      throw new Error("entry wrong credentials");
    }
  } catch (error) {
    res.send("something went wrong" + error);
  }
});

module.exports = profileRouter;
