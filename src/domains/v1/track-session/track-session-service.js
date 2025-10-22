import Joi from "joi";
import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import Role from "../../../common/enums/role-enum.js";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";
import trackSessionQueryConfig from "./track-session-query-config.js";

class TrackSessionService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async getAll(query) {
    const options = buildQueryOptions(trackSessionQueryConfig, query);

    const [data, count] = await Promise.all([
      this.prisma.trackSession.findMany(options),
      this.prisma.trackSession.count({
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
    const data = await this.prisma.trackSession.findFirst({
      where: { id },
      include: {
        track: true,
      },
    });

    if (!data) throw BaseError.notFound("Track session not found.");

    return data;
  }

  async create(value, user) {
    const trackExist = await this.prisma.track.findFirst({
      where: { id: value.track_id },
      select: {
        id: true,
        room: {
          select: {
            id: true,
            schedule: {
              select: {
                id: true,
                conference_schedule: {
                  select: {
                    id: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!trackExist) {
      let validation = "";
      const stack = [];

      validation += "Track not found.";

      stack.push({
        message: "Track not found.",
        path: ["track_id"],
      });

      throw new Joi.ValidationError(validation, stack);
    }

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          trackExist.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          trackExist.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to create track session in this conference!"
        );
      }
    }

    const data = await this.prisma.trackSession.create({ data: value });

    return data;
  }

  async update(id, value, user) {
    const trackSessionExist = await this.prisma.trackSession.findFirst({
      where: { id: id },
      select: {
        track: {
          select: {
            id: true,
            room: {
              select: {
                id: true,
                schedule: {
                  select: {
                    id: true,
                    conference_schedule: {
                      select: {
                        id: true,
                        type: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!trackSessionExist)
      throw BaseError.notFound("Track session not found.");

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          trackSessionExist.track.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          trackSessionExist.track.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to update track session in this conference!"
        );
      }
    }

    if (value?.track_id) {
      const trackExist = await this.prisma.track.findFirst({
        where: { id: value.track_id },
        select: {
          id: true,
        },
      });

      if (!trackExist) {
        let validation = "";
        const stack = [];

        validation += "Track not found.";

        stack.push({
          message: "Track not found.",
          path: ["track_id"],
        });

        throw new Joi.ValidationError(validation, stack);
      }
    }

    const updatedTrackSession = await this.prisma.trackSession.update({
      where: { id },
      data: value,
    });

    return updatedTrackSession;
  }

  async delete(id, user) {
    const data = await this.prisma.trackSession.findFirst({
      where: { id },
      select: {
        track: {
          id: true,
          select: {
            room: {
              select: {
                id: true,
                schedule: {
                  select: {
                    id: true,
                    conference_schedule: {
                      select: {
                        id: true,
                        type: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!data) throw BaseError.notFound("Track session not found.");

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          data.track.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          data.track.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to delete track session in this conference!"
        );
      }
    }

    const deletedTrackSession = await this.prisma.trackSession.delete({
      where: { id },
    });

    return {
      data: deletedTrackSession,
      message: "Track session permanently deleted.",
    };
  }
}

export default new TrackSessionService();
