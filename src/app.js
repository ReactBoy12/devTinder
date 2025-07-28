const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const User2Model = require("./models/user2");
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

// app.post("/newSignUp", async (req, res) => {
//   try {
//     const data = {
//       email: "shailesh@gore.com",
//       password: "Shailesh@123",
//       mobileNumber: "9876543210",
//     };

//     const newsignup = new User2Model(data);
//     await newsignup.save();
//     res.status(201).send("Entry created...");
//   } catch (err) {
//     res.status(501).send("Error generated.....", err);
//   }
// });

app.get("/getAllUser", async (req, res) => {
  try {
    const persons = await User2Model.find({});
    res.status(200).send(persons);
    if (!res.status(200)) {
      throw new Error("error while getting the details..");
    }
  } catch (err) {
    res.status(401).send(err);
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
