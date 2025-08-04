const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, skills } = req.body;
  console.log(emailId.trim());
  if (!firstName || !lastName || skills.length == 0) {
    throw new Error("please enter the fields...");
  } else if (validator.isEmail(emailId) == false) {
    console.log(validator.isEmail(emailId));
    throw new Error("please enter the valid emailId..");
  } else if (validator.isStrongPassword(password) == false) {
    throw new Error("please enter the strong password");
  } else if (skills.length > 10) {
    throw new Error("skills should be not more than 10..");
  }
};

module.exports = validateSignUpData;
