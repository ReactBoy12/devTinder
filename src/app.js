const express = require("express");

const app = express();

// app.use(
//   "/user",
//   [
//     (req, res, next) => {
//       console.log("response 1");
//       // res.send("response send 1 successfully");
//       next();
//       // res.send("response send 1 successfully");
//     },
//     (req, res, next) => {
//       console.log("response 2");
//       // res.send("response send 2 successfully");
//       next();
//     },
//   ],
//   (req, res, next) => {
//     console.log("response 3");
//     // res.send("response send 2 successfully");
//     next();
//   },
//   (req, res, next) => {
//     console.log("response 4");
//     res.send("response send 4 successfully");
//   }
// );

// app.get("/user/:userID/:name/:password", (req, res) => {
//   console.log("request parameter", req.params);
//   // onsole.log("request parameter", req.query);
//   res.send({ firstName: "Shailesh", lastName: "Gore" });
// });

// app.get("/user", (req, res) => {
//   console.log("using query handler", req.query);
//   res.send({ userID: req.query.userId, password: req.query.userPassword });
// });

// app.get("/user/:id", (req, res, next) => {
//   console.log("1 middleware");
//   console.log(req.params.id);
//   if (req.params.id == 1) {
//     console.log(req.params.id, "in data");
//     next();
//   } else {
//     res.send("nd response");
//   }
//   // next();
// });

// app.get("/user/:id", (req, res) => {
//   console.log("2nd middleware but request handler");
//   res.send("2nd response");
// });

app.use("/user/:uname/:password", (req, res, next) => {
  console.log("this is first middleware....");
  let { uname, password } = req.params;
  console.log(req.params.uname);
  if (uname.trim() == "" || password.trim() == "") {
    console.log(req.params.uname);
    res.send("something went wrong");
  } else {
    next();
  }
});
app.get("/user/:uname/:password", (req, res, next) => {
  let { uname, password } = req.params;
  console.log(uname);
  res.send({ uname, password });
});
app.listen(7777, function () {
  console.log("server is running on port 7777");
});
