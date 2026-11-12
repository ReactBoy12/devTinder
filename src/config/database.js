const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shaileshgore1998_db_user:DBM1SzS0FB5MrjNQ@cluster0.ddv0xj1.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
