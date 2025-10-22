import BaseError from "../../../base-classes/base-error.js";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";
import Role from "../../../common/enums/role-enum.js";
import { createdResponse, successResponse } from "../../../utils/response.js";
import ConferenceScheduleService from "./conference-schedule-service.js";

class ConferenceScheduleController {
  async getAll(req, res) {
    const conferenceSchedules = await ConferenceScheduleService.getAll(
      req.validatedQuery
    );

    return successResponse(
      res,
      conferenceSchedules.data,
      "Conference Schedules data retrieved successfully",
      conferenceSchedules.meta
    );
  }

  async getById(req, res) {
    const { id } = req.params;

    const data = await ConferenceScheduleService.getById(id);

    return successResponse(
      res,
      data,
      "Conference Schedule data retrieved successfully"
    );
  }

  async getForUserView(req, res) {
    const { year, type } = req.validatedParams;

    const data = await ConferenceScheduleService.getForUserView(year, type);

    return successResponse(
      res,
      data,
      "Conference Schedule data retrieved successfully"
    );
  }

  async create(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const value = req.body;

    if (req.user.role !== Role.SUPER_ADMIN) {
      if (
        (req.user.role === Role.ADMIN_ICICYTA &&
          value.type === ConferenceScheduleType.ICODSA) ||
        (req.user.role === Role.ADMIN_ICODSA &&
          value.type === ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to create this type of conference schedule!"
        );
      }
    }

    value.start_date = new Date(value.start_date + "T00:00:00Z");
    value.end_date = new Date(value.end_date + "T00:00:00Z");

    const data = await ConferenceScheduleService.create(value);

    return createdResponse(
      res,
      data,
      "Conference Schedule created successfully"
    );
  }

  async update(req, res) {
    if (req.body == undefined) {
      throw BaseError.badRequest("Request body is missing");
    }

    const { id } = req.params;
    const value = req.body;

    if (value.start_date) {
      value.start_date = new Date(value.start_date + "T00:00:00Z");
    }
    if (value.end_date) {
      value.end_date = new Date(value.end_date + "T00:00:00Z");
    }

    const data = await ConferenceScheduleService.update(id, value, req.user);

    return successResponse(
      res,
      data,
      "Conference Schedule updated successfully"
    );
  }

  async delete(req, res) {
    const { id } = req.params;
    const { permanent } = req.validatedQuery;

    let data;
    if (permanent) {
      data = await ConferenceScheduleService.hardDelete(id);
    } else {
      data = await ConferenceScheduleService.softDelete(id);
    }

    return successResponse(res, data.data, data.message);
  }
}

export default new ConferenceScheduleController();
