import Joi from "joi";
import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import Role from "../../../common/enums/role-enum.js";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";
import roomQueryConfig from "./room-query-config.js";
import RoomType from "../../../common/enums/room-type-enum.js";

class RoomService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async getAll(query) {
    const options = buildQueryOptions(roomQueryConfig, query);

    if (query.advSearch?.conference_schedule_id) {
      if (!options.where) {
        options.where = {};
      }

      options.where.schedule = {
        ...options.where.schedule,
        conference_schedule_id: query.advSearch.conference_schedule_id,
      };
    }

    const [data, count] = await Promise.all([
      this.prisma.room.findMany(options),
      this.prisma.room.count({
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
    const data = await this.prisma.room.findFirst({
      where: { id },
      include: {
        schedule: true,
        track: {
          include: {
            track_sessions: true,
          },
        },
      },
    });

    if (!data) throw BaseError.notFound("Room not found.");

    return data;
  }

  async create(value, user) {
    const scheduleExist = await this.prisma.schedule.findFirst({
      where: { id: value.schedule_id },
      select: {
        id: true,
        conference_schedule: {
          select: {
            id: true,
            type: true,
          },
        },
      },
    });

    if (!scheduleExist) {
      let validation = "";
      const stack = [];

      validation += "Schedule not found.";

      stack.push({
        message: "Schedule not found.",
        path: ["schedule_id"],
      });

      throw new Joi.ValidationError(validation, stack);
    }

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          scheduleExist.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          scheduleExist.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to create room in this conference!"
        );
      }
    }

    if (value.type === RoomType.MAIN) {
      const mainRoomExist = await this.prisma.room.findFirst({
        where: {
          schedule_id: value.schedule_id,
          type: RoomType.MAIN,
        },
      });

      if (mainRoomExist) {
        let validation = "";
        const stack = [];

        validation += "Main room already exists.";

        stack.push({
          message: "Main room already exists.",
          path: ["type"],
        });

        throw new Joi.ValidationError(validation, stack);
      }
    }

    if (value.type === RoomType.PARALLEL) {
      const identifierExist = await this.prisma.room.findFirst({
        where: {
          schedule_id: value.schedule_id,
          identifier: value.identifier,
        },
      });

      if (identifierExist) {
        let validation = "";
        const stack = [];
        validation +=
          "Identifier must be unique for PARALLEL rooms within the same schedule.";

        stack.push({
          message:
            "Identifier must be unique for PARALLEL rooms within the same schedule.",
          path: ["identifier"],
        });

        throw new Joi.ValidationError(validation, stack);
      }
    }

    if (value?.track) {
      const createdTrack = await this.prisma.track.create({
        data: {
          ...value.track,
        },
      });

      delete value.track;

      value.track_id = createdTrack.id;
    }

    const data = await this.prisma.room.create({
      data: value,
    });

    return data;
  }

  async update(id, value, user) {
    const data = await this.prisma.room.findFirst({
      where: { id },
      select: {
        id: true,
        track_id: true,
        type: true,
        schedule_id: true,
        schedule: {
          select: {
            conference_schedule: {
              select: {
                id: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (!data) throw BaseError.notFound("Room not found.");

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          data.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          data.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to create room in this conference!"
        );
      }
    }

    if (value?.schedule_id) {
      const scheduleExist = await this.prisma.schedule.findFirst({
        where: { id: value.schedule_id },
        select: {
          id: true,
        },
      });

      if (!scheduleExist) {
        let validation = "";
        const stack = [];

        validation += "Schedule not found.";

        stack.push({
          message: "Schedule not found.",
          path: ["schedule_id"],
        });

        throw new Joi.ValidationError(validation, stack);
      }
    }

    if (value?.type === RoomType.MAIN && data?.type !== RoomType.MAIN) {
      const mainRoomExist = await this.prisma.room.findFirst({
        where: {
          schedule_id: value?.schedule_id
            ? value.schedule_id
            : data.schedule_id,
          type: RoomType.MAIN,
        },
      });

      if (mainRoomExist) {
        let validation = "";
        const stack = [];

        validation += "Main room already exists.";

        stack.push({
          message: "Main room already exists.",
          path: ["type"],
        });

        throw new Joi.ValidationError(validation, stack);
      }
    }

    if (value?.identifier && data?.type === RoomType.PARALLEL) {
      const identifierExist = await this.prisma.room.findFirst({
        where: {
          NOT: { id: data.id },
          schedule_id: value?.schedule_id
            ? value.schedule_id
            : data.schedule_id,
          identifier: value.identifier,
        },
      });

      if (identifierExist) {
        let validation = "";
        const stack = [];
        validation +=
          "Identifier must be unique for PARALLEL rooms within the same schedule.";

        stack.push({
          message:
            "Identifier must be unique for PARALLEL rooms within the same schedule.",
          path: ["identifier"],
        });

        throw new Joi.ValidationError(validation, stack);
      }
    }

    if (value?.track && data.track_id) {
      const updatedTrack = await this.prisma.track.update({
        where: { id: data.track_id },
        data: {
          ...value.track,
        },
      });

      delete value.track;
    }

    const updatedRoom = await this.prisma.room.update({
      where: { id },
      data: value,
    });

    return updatedRoom;
  }

  async delete(id, user) {
    const data = await this.prisma.room.findFirst({
      where: { id },
      select: {
        id: true,
        schedule_id: true,
        schedule: {
          select: {
            conference_schedule: {
              select: {
                id: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (!data) throw BaseError.notFound("Room not found.");

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          data.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          data.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to delete room in this conference!"
        );
      }
    }

    const deletedRoom = await this.prisma.room.delete({
      where: { id },
    });

    return {
      data: deletedRoom,
      message: "Room and its associated data permanently deleted.",
    };
  }
}

export default new RoomService();
