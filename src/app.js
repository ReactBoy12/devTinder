const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("response 1");
    // res.send("response send 1 successfully");
    next();
    // res.send("response send 1 successfully");
  },
  (req, res, next) => {
    console.log("response 2");
    // res.send("response send 2 successfully");
    next();
  },
  (req, res, next) => {
    console.log("response 3");
    // res.send("response send 2 successfully");
    next();
  },
  (req, res, next) => {
    console.log("response 4");
    res.send("response send 4 successfully");
  }
);

// app.get("/user/:userID/:name/:password", (req, res) => {
//   console.log("request parameter", req.params);
//   // onsole.log("request parameter", req.query);
//   res.send({ firstName: "Shailesh", lastName: "Gore" });
// });

// app.get("/user", (req, res) => {
//   console.log("using query handler", req.query);
//   res.send({ userID: req.query.userId, password: req.query.userPassword });
// });

app.listen(7777, function () {
  console.log("server is running on port 7777");
});
