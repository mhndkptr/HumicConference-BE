import Joi from "joi";
import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import Role from "../../../common/enums/role-enum.js";
import scheduleQueryConfig from "./schedule-query-config.js";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";

class ScheduleService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async getAll(query) {
    const options = buildQueryOptions(scheduleQueryConfig, query);

    const [data, count] = await Promise.all([
      this.prisma.schedule.findMany(options),
      this.prisma.schedule.count({
        where: options.where,
      }),
    ]);

    const currentPage = query?.pagination?.page ?? 1;
    const itemsPerPage = query?.pagination?.limit ?? 10;
    const totalPages = Math.ceil(count / itemsPerPage);

    return {
      data,
      meta:
        query?.pagination?.page && query?.pagination?.limit
          ? {
              totalItems: count,
              totalPages,
              currentPage,
              itemsPerPage,
            }
          : null,
    };
  }

  async getById(id) {
    const data = await this.prisma.schedule.findFirst({
      where: { id },
      include: {
        rooms: {
          include: {
            track: {
              include: {
                track_sessions: true,
              },
            },
          },
        },
      },
    });

    if (!data) throw BaseError.notFound("Schedule not found.");

    return data;
  }

  async create(value, user) {
    const conferenceScheduleExist =
      await this.prisma.conferenceSchedule.findFirst({
        where: { id: value.conference_schedule_id },
        select: {
          id: true,
          type: true,
        },
      });

    if (!conferenceScheduleExist) {
      let validation = "";
      const stack = [];

      validation += "Conference schedule not found.";

      stack.push({
        message: "Conference schedule not found.",
        path: ["conference_schedule_id"],
      });

      throw new Joi.ValidationError(validation, stack);
    }

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          conferenceScheduleExist.type === ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          conferenceScheduleExist.type === ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to create schedule in this conference!"
        );
      }
    }

    const data = await this.prisma.schedule.create({ data: value });

    return data;
  }

  async update(id, value, user) {
    const conferenceScheduleExist =
      await this.prisma.conferenceSchedule.findFirst({
        where: { id: value.conference_schedule_id },
        select: {
          id: true,
          type: true,
        },
      });

    if (!conferenceScheduleExist) {
      let validation = "";
      const stack = [];

      validation += "Conference schedule not found.";

      stack.push({
        message: "Conference schedule not found.",
        path: ["conference_schedule_id"],
      });

      throw new Joi.ValidationError(validation, stack);
    }

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          conferenceScheduleExist.type === ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          conferenceScheduleExist.type === ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to update schedule in this conference!"
        );
      }
    }

    const data = await this.prisma.schedule.findFirst({
      where: { id },
    });

    if (!data) throw BaseError.notFound("Schedule not found.");

    const updatedSchedule = await this.prisma.schedule.update({
      where: { id },
      data: value,
    });

    return updatedSchedule;
  }

  async delete(id, user) {
    const data = await this.prisma.schedule.findFirst({
      where: { id },
      include: {
        conference_schedule: true,
      },
    });

    if (!data) throw BaseError.notFound("Schedule not found.");

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          data.conference_schedule.type === ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          data.conference_schedule.type === ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to delete schedule in this conference!"
        );
      }
    }

    const deletedSchedule = await this.prisma.schedule.delete({
      where: { id },
    });

    return {
      data: deletedSchedule,
      message: "Schedule permanently deleted.",
    };
  }
}

export default new ScheduleService();
