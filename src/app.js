const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const {
  emailAnddPassValidation,
} = require("./middlewares/emailAndPassValidation");
const validateSignUpData = require("./utils/validateSignUpData");
const User2Model = require("./models/user2");
const app = express();
app.use(express.json());

app.post("/signUp", async (req, res) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  try {
    validateSignUpData(req);
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
    res.status(500).send("something went wrong => " + error);
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const isEmailValid = await User.find({ emailId: emailId });
    console.log(isEmailValid);

    if (isEmailValid == false) {
      throw new Error("invalid credentials.....");
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        isEmailValid[0].password
      );

      if (isPasswordValid) {
        res.cookie("token", "asdfghjklkjhgfdsdfghjk");
        res.status(302).send("data found and user logged in successfully");
      } else {
        throw new Error("invalid credentials...try again");
      }
    }
  } catch (error) {
    res.status(500).send("something went wrong => " + error);
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

app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    const deleteOneUser = await User.findByIdAndDelete({ _id: userId });
    console.log(deleteOneUser);
    if (deleteOneUser === null) {
      res.status(404).send("User does not exist to delete");
    } else {
      res.send("deleted successfully..");
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch(
  "/user/:id",
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      console.log(userId);
      const isIdFound = await User.find({ _id: userId });
      if (isIdFound.length !== 0) {
        next();
      } else {
        res.send("Error while finding ID..please check");
      }
    } catch (err) {
      res.status(400).send("something went wrong while requesting user");
    }
  },
  // emailAnddPassValidation,
  async (req, res) => {
    const { ...data } = req.body;
    const _id = req.params.id;
    console.log(_id);

    const ALLOWED_UPDATE = [
      "firstName",
      "lastName",
      "age",
      "password",
      "skills",
    ];
    try {
      console.log(Object.keys(data), "check the data");

      const isItemAllowed = Object.keys(data).every((e) => {
        return ALLOWED_UPDATE.includes(e);
      });

      if (!isItemAllowed) {
        throw new Error("updates are not allowed...");
      }
      console.log(isItemAllowed);
      if (data.skills.length > 10) {
        throw new Error("skills cannot be more than 10");
      }
      // console.log(isIdFound, "data");
      await User.findByIdAndUpdate(_id, data, { runValidators: true });
      res.send("Data updated successfully..");
    } catch (err) {
      console.log(err);
      res.status(400).send("something went wrong while updating " + err);
    }
  }
);

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
