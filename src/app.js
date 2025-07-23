const express = require("express");

const app = express();

// app.use((req, res) => {
//   console.log("request check");
//   res.send("hello from my server");
// });

app.use("/test", (req, res) => {
  res.send("this test for server");
});

app.use("/hello", (req, res) => {
  res.send("hello hello developers");
});

app.listen(7777, function () {
  console.log("server is running on port 7777");
});
