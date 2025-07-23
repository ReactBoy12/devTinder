const express = require("express");

const app = express();

app.get("/user/:userID/:name/:password", (req, res) => {
  console.log("request parameter", req.params);
  // onsole.log("request parameter", req.query);
  res.send({ firstName: "Shailesh", lastName: "Gore" });
});

app.listen(7777, function () {
  console.log("server is running on port 7777");
});
