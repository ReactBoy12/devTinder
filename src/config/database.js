const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shaileshgore1998:cMFYtfJo23xSF2eN@cluster0.hettur7.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
