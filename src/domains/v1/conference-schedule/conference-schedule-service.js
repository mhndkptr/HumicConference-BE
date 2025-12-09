import Joi from "joi";
import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import Role from "../../../common/enums/role-enum.js";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";
import conferenceScheduleQueryConfig from "./conference-schedule-query-config.js";

class ConferenceScheduleService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async getAll(query) {
    const options = buildQueryOptions(conferenceScheduleQueryConfig, query);

    const [data, count] = await Promise.all([
      this.prisma.conferenceSchedule.findMany(options),
      this.prisma.conferenceSchedule.count({
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
    const data = await this.prisma.conferenceSchedule.findFirst({
      where: { id },
      include: {
        schedules: {
          include: {
            rooms: {
              include: {
                track: true,
              },
            },
          },
        },
      },
    });

    if (!data) throw BaseError.notFound("Conference Schedule not found.");

    return data;
  }

  async getForUserView(year, type) {
    const data = await this.prisma.conferenceSchedule.findFirst({
      where: { year: year, type: type },
      include: {
        schedules: {
          include: {
            rooms: {
              include: {
                track: true,
              },
            },
          },
        },
      },
    });

    if (!data) throw BaseError.notFound("Conference Schedule not found.");

    return data;
  }

  async create(value) {
    const yearExist = await this.prisma.conferenceSchedule.findFirst({
      where: {
        year: value.year,
        type: value.type,
      },
    });

    if (yearExist) {
      let validation = "";
      const stack = [];

      validation += "Conference Schedule already exists for the given year.";

      stack.push({
        message: "Conference Schedule already exists for the given year.",
        path: ["year"],
      });

      throw new Joi.ValidationError(validation, stack);
    }

    let data = null;

    if (value.is_active === true) {
      const result = await this.prisma.$transaction([
        this.prisma.conferenceSchedule.updateMany({
          where: {
            type: value.type,
            is_active: true,
          },
          data: {
            is_active: false,
          },
        }),
        this.prisma.conferenceSchedule.create({
          data: value,
        }),
      ]);
      data = result[1];
    } else {
      data = await this.prisma.conferenceSchedule.create({ data: value });
    }

    return data;
  }

  async update(id, value, user) {
    const data = await this.prisma.conferenceSchedule.findFirst({
      where: { id },
    });

    if (!data) throw BaseError.notFound("Conference Schedule not found.");

    const targetType = value?.type || data.type;
    const targetYear = value?.year || data.year;

    const yearExist = await this.prisma.conferenceSchedule.findFirst({
      where: {
        id: { not: id },
        year: targetYear,
        type: targetType,
      },
    });

    if (yearExist) {
      let validation = "";
      const stack = [];

      validation += "Conference Schedule already exists for the given year.";

      stack.push({
        message: "Conference Schedule already exists for the given year.",
        path: ["year"],
      });

      throw new Joi.ValidationError(validation, stack);
    }

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          value.type === ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          value.type === ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to update this type of conference schedule!"
        );
      }
    }

    let updatedSchedule = null;

    if (value?.is_active && value?.is_active === true) {
      const result = await this.prisma.$transaction([
        this.prisma.conferenceSchedule.updateMany({
          where: {
            type: targetType,
            is_active: true,
            id: { not: id },
          },
          data: {
            is_active: false,
          },
        }),
        this.prisma.conferenceSchedule.update({
          where: { id },
          data: value,
        }),
      ]);
      updatedSchedule = result[1];
    } else {
      updatedSchedule = await this.prisma.conferenceSchedule.update({
        where: { id },
        data: value,
      });
    }

    return updatedSchedule;
  }

  async softDelete(id) {
    const data = await this.prisma.conferenceSchedule.findFirst({
      where: { id },
    });

    if (!data) throw BaseError.notFound("Conference Schedule not found.");

    const updatedSchedule = await this.prisma.conferenceSchedule.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    return {
      data: updatedSchedule,
      message: "Conference Schedule deleted successfully",
    };
  }

  async hardDelete(id) {
    const data = await this.prisma.conferenceSchedule.findFirst({
      where: { id },
    });

    if (!data) throw BaseError.notFound("Conference Schedule not found.");

    if (data.deleted_at === null) {
      throw BaseError.badRequest(
        "Conference Schedule must be soft deleted first before hard delete."
      );
    }

    const deletedSchedule = await this.prisma.conferenceSchedule.delete({
      where: { id },
    });

    return {
      data: deletedSchedule,
      message: "Conference Schedule permanently deleted.",
    };
  }
}

export default new ConferenceScheduleService();
