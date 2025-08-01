const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    // },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        console.log("value while schema..", value);
        if (value.includes(" ")) {
          throw new Error("value cannot contain the spacess check....");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 24,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 60,
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        console.log(value, " of gender");
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("input is not valid check");
        }
      },
    },
    skills: {
      type: [String],
    },
    about: {
      type: String,
      default: "Studied from goodIntent institute",
    },
    profileImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
