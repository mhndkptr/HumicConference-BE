import BaseRoutes from "../../../base-classes/base-routes.js";
import authTokenMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import validateQueryParamsCredentials from "../../../middlewares/validate-query-params-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import TrackSessionController from "./track-session-controller.js";
import {
  createTrackSessionSchema,
  getAllTrackSessionParamsSchema,
  updateTrackSessionSchema,
} from "./track-session-schema.js";

class TrackSessionRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [
      validateQueryParamsCredentials(getAllTrackSessionParamsSchema),
      tryCatch(TrackSessionController.getAll),
    ]);
    this.router.get("/:id", [tryCatch(TrackSessionController.getById)]);
    this.router.post("/", [
      authTokenMiddleware.authenticate,
      validateCredentials(createTrackSessionSchema),
      tryCatch(TrackSessionController.create),
    ]);
    this.router.patch("/:id", [
      authTokenMiddleware.authenticate,
      validateCredentials(updateTrackSessionSchema),
      tryCatch(TrackSessionController.update),
    ]);
    this.router.delete("/:id", [
      authTokenMiddleware.authenticate,
      tryCatch(TrackSessionController.delete),
    ]);
  }
}

export default new TrackSessionRoutes().router;
