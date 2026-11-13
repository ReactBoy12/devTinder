const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: true,
      minLength: 10,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid Email");
        }
      },
    },
    gender: {
      type: String,
      required: true,
      validate(value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender must be Male, Female, or Others");
        }
      },
    },
    about: {
      type: String,
      default:
        "This is a default about section. Please update it with your own information.",
    },
    languages: {
      type: [String],
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
