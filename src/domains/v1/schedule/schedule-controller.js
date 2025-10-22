import BaseError from "../../../base-classes/base-error.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import ScheduleService from "./schedule-service.js";

class ScheduleController {
  async getAll(req, res) {
    const schedules = await ScheduleService.getAll(req.validatedQuery);

    return successResponse(
      res,
      schedules.data,
      "Schedules data retrieved successfully",
      schedules.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;

    const data = await ScheduleService.getById(id);

    return successResponse(res, data, "Schedule data retrieved successfully");
  }

  async create(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const value = req.body;

    value.date = new Date(value.date + "T00:00:00Z");

    const data = await ScheduleService.create(value, req.user);

    return createdResponse(res, data, "Schedule created successfully");
  }

  async update(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const { id } = req.params;
    const value = req.body;

    if (value.date) {
      value.date = new Date(value.date + "T00:00:00Z");
    }

    const data = await ScheduleService.update(id, value, req.user);

    return successResponse(res, data, "Schedule updated successfully");
  }

  async delete(req, res) {
    const { id } = req.params;

    const data = await ScheduleService.delete(id, req.user);

    return successResponse(res, data.data, data.message);
  }
}

export default new ScheduleController();
