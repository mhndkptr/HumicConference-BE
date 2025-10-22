import BaseRoutes from "../../../base-classes/base-routes.js";
import authTokenMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import validateQueryParamsCredentials from "../../../middlewares/validate-query-params-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import ScheduleController from "./schedule-controller.js";
import {
  createScheduleSchema,
  getAllScheduleParamsSchema,
  updateScheduleSchema,
} from "./schedule-schema.js";

class ScheduleRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [
      validateQueryParamsCredentials(getAllScheduleParamsSchema),
      tryCatch(ScheduleController.getAll),
    ]);
    this.router.get("/:id", [tryCatch(ScheduleController.getById)]);
    this.router.post("/", [
      authTokenMiddleware.authenticate,
      validateCredentials(createScheduleSchema),
      tryCatch(ScheduleController.create),
    ]);
    this.router.patch("/:id", [
      authTokenMiddleware.authenticate,
      validateCredentials(updateScheduleSchema),
      tryCatch(ScheduleController.update),
    ]);
    this.router.delete("/:id", [
      authTokenMiddleware.authenticate,
      tryCatch(ScheduleController.delete),
    ]);
  }
}

export default new ScheduleRoutes().router;
