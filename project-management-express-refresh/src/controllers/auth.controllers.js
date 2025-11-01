import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens", []);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // searching in the database against the incoming username or email
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  // checking if the user exists
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  // Creating a user object
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  // generating temporary tokens
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  // setting the tokens
  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false }); // saving user to db

  // sending verification link to user email
  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user?.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  // formatting what data to send as a res
  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry",
  );

  // checking for errors
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering a user");

  // constructing and returning a response
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registered succesfully and verification link has been sent to the email",
      ),
    );
});

export { registerUser };
