const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong");
  }
};

const validatedEditProfileData = (req) => {
  const allowEditField = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req).every((field) =>
    allowEditField.includes(field),
  );

  return isAllowed;
};

module.exports = { validateSignUpData, validatedEditProfileData };
