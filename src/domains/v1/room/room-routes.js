import BaseRoutes from "../../../base-classes/base-routes.js";
import authTokenMiddleware from "../../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import validateParamsCredentials from "../../../middlewares/validate-params-credentials-middleware.js";
import tryCatch from "../../../utils/tryCatcher.js";
import RoomController from "./room-controller.js";
import {
  createRoomSchema,
  getAllRoomParamsSchema,
  updateRoomSchema,
} from "./room-schema.js";

class RoomRoutes extends BaseRoutes {
  routes() {
    this.router.get("/", [
      validateParamsCredentials(getAllRoomParamsSchema),
      tryCatch(RoomController.getAll),
    ]);
    this.router.get("/:id", [tryCatch(RoomController.getById)]);
    this.router.post("/", [
      authTokenMiddleware.authenticate,
      validateCredentials(createRoomSchema),
      tryCatch(RoomController.create),
    ]);
    this.router.patch("/:id", [
      authTokenMiddleware.authenticate,
      validateCredentials(updateRoomSchema),
      tryCatch(RoomController.update),
    ]);
    this.router.delete("/:id", [
      authTokenMiddleware.authenticate,
      tryCatch(RoomController.delete),
    ]);
  }
}

export default new RoomRoutes().router;
