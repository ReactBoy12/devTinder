const express = require("express");

const adminAuth = require("./middlewares/adminAuth");
const app = express();

// app.use("/admin", adminAuth.adminAuth);
// // app.use("/admin");
// app.get("/admin/getUserData", adminAuth.userAuth, (req, res, next) => {
//   res.send("User data retrieved successfully");
// });

// app.get("/admin/deleteUserData", (req, res, next) => {
//   res.send("User data deleted successfully");
// });
app.get("/getUserData", (req, res, next) => {
  try {
    // Simulating an error
    // throw new Error("Something went wrong while retrieving user data");
    res.status(200).send("User data retrieved successfully"); 
  } catch (err) {
    res.status(500).send("Internal server error in get");
  }
 
});

// app.use("/", (err, req, res, next) => {
//   console.log(err, "111");
//   res.status(500).send("Internal Server Error");
// });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
