const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const User2Model = require("./models/user2");
const app = express();
app.use(express.json());

app.post("/signUp", async (req, res) => {
  try {
    let userObj = req.body;
    const newUser = new User(userObj);
    await newUser.save();
    // throw new Error("sdsd");
    res.status(401).send("user registered successfully");
  } catch (err) {
    res.status(500).send("something went wrong => ", err);
  }
});

app.get("/user", async (req, res) => {
  try {
    let userEmail = req.body.emailId;
    const userDetails = await User.findOne({ emailId: userEmail });
    if (userDetails.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.status(200).send(userDetails);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/userById", async (req, res) => {
  try {
    let userId = req.body._id;
    console.log("details", typeof userId);
    const userDetails = await User.findById(userId).exec();

    if (userDetails.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.status(200).send(userDetails);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.status(200).send(allUsers);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
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
