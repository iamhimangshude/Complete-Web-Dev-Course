import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* const healthCheck = (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, null, "Server is running"));
  } catch (error) {}
}; 
*/

const healthCheck = asyncHandler((req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, null, "Server is running in async mode"));
});

export { healthCheck };
