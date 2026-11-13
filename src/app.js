const express = require("express");
const connectDB = require("./config/database");
const adminAuth = require("./middlewares/adminAuth");
const User = require("./models/user");
const app = express();
app.use(express.json());

app.post("/signUp", async (req, res) => {
  try {
    const requestBody = req.body;
    console.log("Request Body:", requestBody);
    const userData = new User(requestBody);
    console.log(userData);
    await userData.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    // console.error(error);
    res.status(500).send("Internal Server Error" + error);
  }
});

app.put("/UpdateUser", async (req, res) => {
  const { lastName, emailId } = req.body;
  const userData = new User(req.body);
  await User.findOne({ lastName: lastName }).updateOne({ emailId: emailId });
  await userData.save();
  res.status(200).send("User updated successfully");
});

app.get("/getUser", async (req, res) => {
  const emailId = req.body.emailId;
  try {
    const user = await User.find({ emailId: emailId });
    res.status(200).send(`User Found - ${user}`);
  } catch (error) {
    res.status(500).send("User Not Found...", error);
  }
});

app.delete("/deleteUser", async (req, res) => {
  const userId = req.body.userId;
  await User.findByIdAndDelete(userId);
  res.status(200).send("User deleted successfully");
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("somethins went wrong", error);
  }
});
const ALLOWEDUPDATES = ["about", "gender", "languages", "skills"];

app.patch("/updateUser/:_id", async (req, res) => {
  const { ...updateData } = req.body;
  const userId = req.params._id;
  const isUpdateAllowed = Object.keys(updateData).every((val) => {
    return ALLOWEDUPDATES.includes(val);
  });
  // console.log(_id);
  console.log(isUpdateAllowed);
  try {
    if (!isUpdateAllowed || updateData.languages.length > 10) {
      return res.status(400).send("Invalid updates");
    }
    await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        runValidators: true,
      }
    );
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Something went wrong" + error);
  }
});
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });

