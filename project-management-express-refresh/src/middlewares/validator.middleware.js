import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req); // validationResult processes the request and returns errors (if any).
  if (errors.isEmpty()) {
    // moving to other middleware if no err
    return next();
  }
  const extractedErrors = [];

  // pushing the errors into the extractedErrors array and returning that.
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
