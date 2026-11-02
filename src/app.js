const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "John", lastname: "Doe" });
});

app.post("/user", (req, res) => {
  //do operation for saving the data to the database
  res.send("User data saved successfully");
});

app.delete("/user", (req, res) => {
  //do operation for deleting the data from the database
  res.send("User data deleted successfully");
});

app.put("/user", (req, res) => {
  //do operation for updating the data in the database
  res.send("User data updated successfully");
});

app.patch("/user", (req, res) => {
  //do operation for partially updating the data in the database
  res.send("User data partially updated successfully");
});

app.use("/", (req, res) => {
  res.send("Home");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
