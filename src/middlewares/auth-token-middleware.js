import BaseError from "../base-classes/base-error.js";
import jwt from "jsonwebtoken";
import { PrismaService } from "../common/services/prisma-service.js";
import jwtConfig from "../config/jwt-config.js";
import Role from "../common/enums/role-enum.js";

class AuthMiddleware {
  constructor() {
    this.JWTConfig = jwtConfig();
    this.prisma = new PrismaService();
  }

  authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(BaseError.unauthorized("No Token Provided"));
    }

    try {
      const decoded = jwt.verify(token, this.JWTConfig.JWT_SECRET);

      if (
        !decoded ||
        !decoded.id ||
        !decoded.type ||
        decoded.type !== "access"
      ) {
        return next(BaseError.unauthorized("Invalid Token"));
      }

      if (
        decoded.role !== Role.SUPER_ADMIN &&
        decoded.role !== Role.ADMIN_ICICYTA &&
        decoded.role !== Role.ADMIN_ICODSA
      ) {
        return next(BaseError.unauthorized("Invalid Token"));
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return next(
          new BaseError.unauthorized(
            "Token Valid, But User Not Found in Database"
          )
        );
      }

      req.user = user;

      next();
    } catch (err) {
      let message = "Token Is Invalid Or No Longer Valid";
      if (err.message === "invalid signature") message = "Invalid Signature";
      if (err.message === "invalid token") message = "Invalid Token";
      if (err.message === "jwt expired") message = "Token Expired";

      return next(BaseError.unauthorized(message));
    }
  };

  authorizeRoles = (roles) => {
    return (req, res, next) => {
      const user = req.user;

      if (!user) {
        return next(
          new BaseError(
            401,
            statusCodes.UNAUTHORIZED.message,
            "UNAUTHORIZED",
            "User Not Authenticated"
          )
        );
      }

      if (!roles.includes(user.role)) {
        return next(
          new BaseError(
            403,
            statusCodes.FORBIDDEN.message,
            "FORBIDDEN",
            "Access Denied"
          )
        );
      }

      next();
    };
  };
}

export default new AuthMiddleware();
