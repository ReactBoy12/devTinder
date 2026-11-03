const adminAuth = (req, res, next) => {
  const token = "asdfghjkcl";
  if (token == "asdfghjkcl") {
    console.log("Token is valid");
    next();
  } else {
    res.status(401).send("Unauthorized access");
  }
};

const userAuth = (req, res, next) => {
  const token = "asdfghjkcl";
  if (token == "asdfghjkcl") {
    console.log("Token is valid good to go");
    next();
  } else {
    res.status(401).send("Unauthorized access");
  }
};

module.exports = { adminAuth, userAuth };
