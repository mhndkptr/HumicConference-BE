import statusCodes from "../errors/status-codes.js";

/**
 * Success response for successful operations
 * @param {any} data - The data to return in the response
 * @param {string} message - Success message
 * @returns {object} - Formatted success response
 */
export function successResponse(
  res,
  data = "Request successful",
  message = "Success",
  pagination = null
) {
  return res.status(statusCodes.OK.code).json({
    code: statusCodes.OK.code,
    status: statusCodes.OK.message,
    message: message,
    pagination: pagination,
    data: data,
    errors: null,
  });
}

/**
 * Created response for resource creation
 * @param {any} data - The newly created resource
 * @param {string} message - Success message
 * @returns {object} - Formatted created response
 */
export function createdResponse(
  res,
  data = "Resource created successfully",
  message = "Success"
) {
  return res.status(statusCodes.CREATED.code).json({
    code: statusCodes.CREATED.code,
    status: statusCodes.CREATED.message,
    message,
    pagination: null,
    data: data,
    errors: null,
  });
}

export function updatedResponse(
  res,
  data = "Resource updated successfully",
  message = "Success"
) {
  return res.status(statusCodes.OK.code).json({
    code: statusCodes.OK.code,
    status: statusCodes.OK.message,
    message,
    pagination: null,
    data: data,
    errors: null,
  });
}
