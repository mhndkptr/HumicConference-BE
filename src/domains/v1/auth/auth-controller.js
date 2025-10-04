import BaseError from "../../../base-classes/base-error.js";
import { parseExpireToMs } from "../../../utils/parseExpire.js";
import { successResponse } from "../../../utils/response.js";
import AuthService from "./auth-service.js";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const data = await AuthService.login(email, password);

    res
      .cookie("refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: parseExpireToMs("7d"),
      })
      .header("Authorization", `Bearer ${data.access_token}`);

    return successResponse(res, data.user, "Login successful");
  }

  async refreshToken(req, res) {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      throw BaseError.unauthorized("Refresh token not found");
    }

    const token = await AuthService.refreshToken(refresh_token);

    res.header("Authorization", `Bearer ${token.access_token}`);

    return successResponse(res, null, "Token refreshed successfully");
  }

  async me(req, res) {
    const user = req.user;

    if (!user) {
      throw BaseError.unauthorized("User not found");
    }

    const data = await AuthService.getProfile(user.id);

    return successResponse(res, data, "User profile retrieved successfully");
  }
}

export default new AuthController();
