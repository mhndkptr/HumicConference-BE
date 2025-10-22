import BaseRoutes from "../../../base-classes/base-routes.js";
import Role from "../../../common/enums/role-enum.js";
import authTokenMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import validateParamsCredentials from "../../../middlewares/validate-params-credentials-middleware.js";
import validateQueryParamsCredentials from "../../../middlewares/validate-query-params-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import ConferenceScheduleController from "./conference-schedule-controller.js";
import {
  createConferenceScheduleSchema,
  deleteConferenceScheduleParamsSchema,
  getAllConferenceScheduleParamsSchema,
  getConferenceScheduleForUserViewParamsSchema,
  updateConferenceScheduleSchema,
} from "./conference-schedule-schema.js";

class ConferenceScheduleRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [
      validateQueryParamsCredentials(getAllConferenceScheduleParamsSchema),
      tryCatch(ConferenceScheduleController.getAll),
    ]);
    this.router.get("/:id", [tryCatch(ConferenceScheduleController.getById)]);
    this.router.post("/", [
      authTokenMiddleware.authenticate,
      validateCredentials(createConferenceScheduleSchema),
      tryCatch(ConferenceScheduleController.create),
    ]);
    this.router.patch("/:id", [
      authTokenMiddleware.authenticate,
      validateCredentials(updateConferenceScheduleSchema),
      tryCatch(ConferenceScheduleController.update),
    ]);
    this.router.delete("/:id", [
      authTokenMiddleware.authenticate,
      authTokenMiddleware.authorizeRoles([Role.SUPER_ADMIN]),
      validateQueryParamsCredentials(deleteConferenceScheduleParamsSchema),
      tryCatch(ConferenceScheduleController.delete),
    ]);

    this.router.get("/:type/:year", [
      validateParamsCredentials(getConferenceScheduleForUserViewParamsSchema),
      tryCatch(ConferenceScheduleController.getForUserView),
    ]);
  }
}

export default new ConferenceScheduleRoutes().router;
