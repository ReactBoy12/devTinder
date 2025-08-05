const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userLoginAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const verifyTheToken = await jwt.verify(token, "shai@1221");
    if (verifyTheToken == {}) {
      throw new Error("not valid token..");
    }
    const ID = verifyTheToken.data;
    const authData = await User.findById(ID);
    if (!authData) {
      throw new Error("User not Found");
    } else {
      req.authData = authData;
      next();
    }
  } catch (error) {
    res.status(400).send("something went wrong => " + error);
  }
};

module.exports = {
  userLoginAuth,
};
