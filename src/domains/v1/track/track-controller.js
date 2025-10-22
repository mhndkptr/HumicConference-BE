import { successResponse } from "../../../utils/response.js";
import TrackService from "./track-service.js";

class TrackController {
  async getAll(req, res) {
    const tracks = await TrackService.getAll(req.validatedQuery);

    return successResponse(
      res,
      tracks.data,
      "Tracks data retrieved successfully",
      tracks.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;

    const data = await TrackService.getById(id);

    return successResponse(res, data, "Track data retrieved successfully");
  }
}

export default new TrackController();
