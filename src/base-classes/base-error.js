import statusCodes from "../errors/status-codes.js";

class BaseError extends Error {
  constructor({ code, codeName, message, errorName }) {
    super(message);
    this.statusCode = code;
    this.errorCode = codeName;
    this.errorName = errorName;
  }

  static notFound(message = "Resource does not exist") {
    return new BaseError({
      ...statusCodes.NOT_FOUND,
      errorName: "Resource Not Found",
      message,
    });
  }

  static badRequest(message = "Bad Request") {
    return new BaseError({
      ...statusCodes.BAD_REQUEST,
      errorName: "Bad Request",
      message,
    });
  }

  static unauthorized(message = "Unauthorized") {
    return new BaseError({
      ...statusCodes.UNAUTHORIZED,
      errorName: "Unauthorized",
      message,
    });
  }

  static forbidden(message = "Forbidden") {
    return new BaseError({
      ...statusCodes.FORBIDDEN,
      errorName: "Forbidden",
      message,
    });
  }

  static serviceUnavailable(message = "Service Unavailable") {
    return new BaseError({
      ...statusCodes.SERVICE_UNAVAILABLE,
      errorName: "Service Unavailable",
      message,
    });
  }

  static invalidParams(message = "Invalid Parameters") {
    return new BaseError({
      ...statusCodes.INVALID_PARAMS,
      errorName: "Invalid Parameters",
      message,
    });
  }

  static duplicate(message = "Duplicate Found") {
    return new BaseError({
      ...statusCodes.DUPLICATE,
      errorName: "Duplicate Found",
      message,
    });
  }

  static badGateway(errorName, message = "Service Unavailable") {
    return new BaseError({
      ...statusCodes.BAD_GATEWAY,
      errorName: errorName,
      message,
    });
  }

  static internalServer(message = "Internal Server Error") {
    return new BaseError({
      ...statusCodes.INTERNAL_SERVER_ERROR,
      errorName: "Internal Server Error",
      message,
    });
  }
}

export default BaseError;
