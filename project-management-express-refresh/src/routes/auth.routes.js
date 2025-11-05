import { Router } from "express";
import { registerUser, login } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";

const router = Router();

router.route("/register").post(
  userRegisterValidator(), // Defines validation checks for register
  validate, // Checks if all validations passes
  registerUser, // hits the route after passing all the validations
);
router.route("/login").post(
  userLoginValidator(), // Defines validation checks for login
  validate, // Checks if all validations passes
  login, // hits the route after passing all the validations
);

export default router;
