const validator = require('validator');

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  if(!validator.isStrongPassword(password)) {
    throw new Error("Password is invalid");
  }
};

module.exports = { validateSignupData };