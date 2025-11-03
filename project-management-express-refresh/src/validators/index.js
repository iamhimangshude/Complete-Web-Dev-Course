import { body } from "express-validator";

// writing custom validator for registering a user
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email provided"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lowercase")
      .isLength({ min: 3 })
      .withMessage("Username must have at least 3 characters"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("fullName").optional().trim(),
  ];
};

// writing custom validator for logging in a user
const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export { userRegisterValidator, userLoginValidator };
