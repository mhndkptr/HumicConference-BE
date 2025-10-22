import BaseRoutes from "../../../base-classes/base-routes.js";
import validateQueryParamsCredentials from "../../../middlewares/validate-query-params-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import TrackController from "./track-controller.js";
import { getAllTrackParamsSchema } from "./track-schema.js";

class TrackRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [
      validateQueryParamsCredentials(getAllTrackParamsSchema),
      tryCatch(TrackController.getAll),
    ]);
    this.router.get("/:id", [tryCatch(TrackController.getById)]);
  }
}

export default new TrackRoutes().router;
