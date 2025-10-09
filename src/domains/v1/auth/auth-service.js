import BaseError from "../../../base-classes/base-error.js";
import { matchPassword } from "../../../utils/passwordConfig.js";
import { PrismaService } from "../../../common/services/prisma-service.js";
import jwtConfig from "../../../config/jwt-config.js";
import {
  parseRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwtTokenConfig.js";

class AuthService {
  constructor() {
    this.prisma = new PrismaService();
    this.JWTConfig = jwtConfig();
  }

  async login(email, password) {
    let user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw BaseError.notFound("User not found");
    }

    const isMatch = await matchPassword(password, user.password);

    if (!isMatch) {
      throw BaseError.badRequest("Invalid credentials");
    }

    const accessToken = generateAccessToken(
      {
        id: user.id,
        role: user.role,
        type: "access",
      },
      this.JWTConfig.JWT_EXPIRES_IN
    );

    const refreshToken = generateRefreshToken(
      {
        id: user.id,
        role: user.role,
        type: "refresh",
      },
      this.JWTConfig.JWT_REFRESH_EXPIRES_IN
    );

    delete user.password;

    return { access_token: accessToken, refresh_token: refreshToken, user };
  }

  async refreshToken(token) {
    const decoded = parseRefreshToken(token);

    if (!decoded || decoded.type !== "refresh") {
      throw BaseError.unauthorized("Invalid token");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw BaseError.notFound("User not found");
    }

    const accessToken = generateAccessToken(
      {
        id: user.id,
        role: decoded.role,
        type: "access",
      },
      this.JWTConfig.JWT_EXPIRES_IN
    );

    return { access_token: accessToken };
  }

  async getProfile(id) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        profile_uri: true,
        role: true,
        verified_at: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
    });

    if (!user) {
      throw BaseError.notFound("User not found");
    }

    return user;
  }
}

export default new AuthService();
