const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signUp", async (req, res) => {
  try {
    const userObj = {
      firstName: "krishna",
      lastName: "yadav",
      emailId: "krishna@yadav.com",
      password: "krishna@123",
      age: 22,
      gender: "male",
    };
    const newUser = new User(userObj);
    await newUser.save();
    // throw new Error("sdsd");
    res.status(401).send("user registered successfully");
  } catch (err) {
    res.status(500).send("something went wrong => ", err);
  }
});

connectDB()
  .then(() => {
    console.log("DB  connected successfully");
    app.listen(7777, function () {
      console.log("server is running on port 7777");
    });
  })
  .catch((err) => console.log("DB  not connected !!!"));
