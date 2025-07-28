const mongoose = require("mongoose");

const user2Schema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  mobileNumer: {
    type: Number,
  },
});

const User2Model = mongoose.model("User2", user2Schema);
module.exports = User2Model;
