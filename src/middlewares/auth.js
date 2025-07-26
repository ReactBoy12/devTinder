const adminAuth = (req, res, next) => {
  console.log("im running behind the scene");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("unAuthorized User");
  } else {
    next();
  }
};

const userLoginAuth = (req, res, next) => {
  const token = "abc";
  const isUserloginAuthorized = token === "abc";
  if (!isUserloginAuthorized) {
    res.status(401).send("login failed");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userLoginAuth,
};
