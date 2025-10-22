import BaseRoutes from "../../../base-classes/base-routes.js";
import Role from "../../../common/enums/role-enum.js";
import authTokenMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import validateQueryParamsCredentials from "../../../middlewares/validate-query-params-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import UserController from "./user-controller.js";
import {
  createUserSchema,
  deleteUserParamsSchema,
  getAllUsersParamsSchema,
  updateUserSchema,
} from "./user-schema.js";

class UserRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [
      authTokenMiddleware.authenticate,
      authTokenMiddleware.authorizeRoles([Role.SUPER_ADMIN]),
      validateQueryParamsCredentials(getAllUsersParamsSchema),
      tryCatch(UserController.getAll),
    ]);
    this.router.get("/:id", [
      authTokenMiddleware.authenticate,
      authTokenMiddleware.authorizeRoles([Role.SUPER_ADMIN]),
      tryCatch(UserController.getById),
    ]);
    this.router.post("/", [
      authTokenMiddleware.authenticate,
      authTokenMiddleware.authorizeRoles([Role.SUPER_ADMIN]),
      validateCredentials(createUserSchema),
      tryCatch(UserController.create),
    ]);
    this.router.patch("/:id", [
      authTokenMiddleware.authenticate,
      validateCredentials(updateUserSchema),
      tryCatch(UserController.update),
    ]);
    this.router.delete("/:id", [
      authTokenMiddleware.authenticate,
      authTokenMiddleware.authorizeRoles([Role.SUPER_ADMIN]),
      validateQueryParamsCredentials(deleteUserParamsSchema),
      tryCatch(UserController.delete),
    ]);
  }
}

export default new UserRoutes().router;
