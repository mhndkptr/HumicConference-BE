import BaseRoutes from "../../../base-classes/base-routes.js";
import authTokenMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import authController from "./auth-controller.js";
import { loginSchema } from "./auth-schema.js";

class AuthRoutes extends BaseRoutes {
  routes() {
    this.router.post(
      "/login",
      validateCredentials(loginSchema),
      tryCatch(authController.login)
    );

    this.router.post("/refresh-token", [tryCatch(authController.refreshToken)]);

    this.router.get("/me", [
      authTokenMiddleware.authenticate,
      tryCatch(authController.me),
    ]);
  }
}

export default new AuthRoutes().router;
