import BaseError from "../base-classes/base-error.js";
import StatusCodes from "../errors/status-codes.js";

export const errorHandler = (err, req, res, _next) => {
  if (err.name === "ValidationError") {
    const errorObj = {};

    for (const error of err.details) {
      errorObj[error.path] = [error.message];
    }

    if (err.source === "query") {
      return res.status(StatusCodes.INVALID_PARAMS.code).json({
        code: StatusCodes.INVALID_PARAMS.code,
        status: StatusCodes.INVALID_PARAMS.codeName,
        message: StatusCodes.INVALID_PARAMS.message,
        pagination: null,
        data: null,
        errors: {
          name: err.name,
          message: err.message,
          validation: errorObj,
        },
      });
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY.code).json({
      code: StatusCodes.UNPROCESSABLE_ENTITY.code,
      status: StatusCodes.UNPROCESSABLE_ENTITY.codeName,
      message: StatusCodes.UNPROCESSABLE_ENTITY.message,
      pagination: null,
      data: null,
      errors: {
        name: err.name,
        message: err.message,
        validation: errorObj,
      },
    });
  }

  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(StatusCodes.BAD_REQUEST.code).json({
        code: StatusCodes.BAD_REQUEST.code,
        status: StatusCodes.BAD_REQUEST.codeName,
        message: StatusCodes.BAD_REQUEST.message,
        pagination: null,
        data: null,
        errors: {
          name: err.name,
          message: "File size exceeds 5MB limit",
          validation: null,
        },
      });
    }

    return res.status(StatusCodes.BAD_REQUEST.code).json({
      code: StatusCodes.BAD_REQUEST.code,
      status: StatusCodes.BAD_REQUEST.codeName,
      message: StatusCodes.BAD_REQUEST.message,
      pagination: null,
      data: null,
      errors: {
        name: err.name,
        message: err.field,
        validation: null,
      },
    });
  }

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      code: err.statusCode, // e.g. "BAD_REQUEST"
      status: err.errorCode, // e.g. 400
      message: err.message, // e.g. "Bad Request"
      pagination: null,
      data: null,
      errors: {
        name: err.errorName, // e.g. "Bad Request"
        message: err.message, // custom message
        validation: null,
      },
    });
  }

  console.error("❌ Error:", err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
    code: StatusCodes.INTERNAL_SERVER_ERROR.code,
    status: StatusCodes.INTERNAL_SERVER_ERROR.codeName,
    message: StatusCodes.INTERNAL_SERVER_ERROR.message,
    pagination: null,
    data: null,
    errors: {
      name: err.name,
      message: err.message,
      validation: null,
    },
  });
};

export default errorHandler;
