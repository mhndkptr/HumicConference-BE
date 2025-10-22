import BaseError from "../../../base-classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import TrackSessionService from "./track-session-service.js";

class TrackSessionController {
  async getAll(req, res) {
    const trackSessions = await TrackSessionService.getAll(req.validatedQuery);

    return successResponse(
      res,
      trackSessions.data,
      "Track sessions data retrieved successfully",
      trackSessions.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;

    const data = await TrackSessionService.getById(id);

    return successResponse(
      res,
      data,
      "Track session data retrieved successfully"
    );
  }

  async create(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const value = req.body;

    const data = await TrackSessionService.create(value, req.user);

    return createdResponse(res, data, "Track session created successfully");
  }

  async update(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const { id } = req.params;
    const value = req.body;

    const data = await TrackSessionService.update(id, value, req.user);

    return successResponse(res, data, "Track session updated successfully");
  }

  async delete(req, res) {
    const { id } = req.params;

    const data = await TrackSessionService.delete(id, req.user);

    return successResponse(res, data.data, data.message);
  }
}

export default new TrackSessionController();
