import jwt from "jsonwebtoken";
import logger from "./logger.js";
import jwtConfig from "../config/jwt-config.js";

const JWTConfig = jwtConfig();

const generateAccessToken = (data, time = JWTConfig.JWT_EXPIRES_IN) => {
  return jwt.sign(data, JWTConfig.JWT_SECRET, {
    expiresIn: time,
  });
};

const generateRefreshToken = (
  data,
  time = JWTConfig.JWT_REFRESH_EXPIRES_IN
) => {
  const refreshToken = jwt.sign(data, JWTConfig.JWT_REFRESH_SECRET, {
    expiresIn: time,
  });

  return refreshToken;
};

const parseAccessToken = (token) => {
  try {
    return jwt.verify(token, JWTConfig.JWT_SECRET);
  } catch (error) {
    logger.error("Invalid token:", error.message);
    return null;
  }
};

const parseRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWTConfig.JWT_REFRESH_SECRET);
  } catch (error) {
    logger.error("Invalid token:", error.message);
    return null;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  parseAccessToken,
  parseRefreshToken,
};
