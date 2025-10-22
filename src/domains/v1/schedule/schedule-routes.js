import BaseRoutes from "../../../base-classes/base-routes.js";
import authTokenMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import validateParamsCredentials from "../../../middlewares/validate-params-credentials-middleware.js";
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
      validateParamsCredentials(getAllScheduleParamsSchema),
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
