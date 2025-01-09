const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is invalid");
  }
};

const validateEditProfileData = (req) => {
  const allowedValidFeilds = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isAllowed = Object.keys(req.body).every((field) =>
    allowedValidFeilds.includes(field)
  );
  return isAllowed;
};

module.exports = { validateSignupData, validateEditProfileData};
