const emailAnddPassValidation = async (req, res, next) => {
  try {
    let { emailId, password } = req.body;
    console.log(emailId);
    let isEmailCharEmpty = emailId
      .trim()
      .split("")
      .some((emailIdChar) => {
        if (emailIdChar == " ") {
          return true;
        }
      });

    let isPasswordCharEmpty = password
      .trim()
      .split("")
      .some((passwordChar) => {
        if (passwordChar == " ") {
          return true;
        }
      });

    console.log(isEmailCharEmpty, isPasswordCharEmpty, "check");

    if (isEmailCharEmpty) {
      res.send("email cannot contain the spaces");
    } else if (isPasswordCharEmpty) {
      res.send("password cannot contain the spaces");
    } else {
      next();
    }
  } catch (error) {
    res.send("something went wrong while inserting the data");
  }
};

module.exports = { emailAnddPassValidation };
