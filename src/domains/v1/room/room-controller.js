import BaseError from "../../../base-classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import RoomService from "./room-service.js";

class RoomController {
  async getAll(req, res) {
    const rooms = await RoomService.getAll(req.validatedQuery);

    return successResponse(
      res,
      rooms.data,
      "Rooms data retrieved successfully",
      rooms.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;

    const data = await RoomService.getById(id);

    return successResponse(res, data, "Room data retrieved successfully");
  }

  async create(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const value = req.body;

    const data = await RoomService.create(value, req.user);

    return createdResponse(res, data, "Room created successfully");
  }

  async update(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const { id } = req.params;
    const value = req.body;

    const data = await RoomService.update(id, value, req.user);

    return successResponse(res, data, "Room updated successfully");
  }

  async delete(req, res) {
    const { id } = req.params;

    const data = await RoomService.delete(id, req.user);

    return successResponse(res, data.data, data.message);
  }
}

export default new RoomController();
