import { PrismaService } from "../../../common/services/prisma-service.js";
import { buildQueryOptions } from "../../../utils/buildQueryOptions.js";
import BaseError from "../../../base-classes/base-error.js";
import Role from "../../../common/enums/role-enum.js";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";
import trackQueryConfig from "./track-query-config.js";

class TrackService {
  constructor() {
    this.prisma = new PrismaService();
  }

  async getAll(query) {
    const options = buildQueryOptions(trackQueryConfig, query);

    const [data, count] = await Promise.all([
      this.prisma.track.findMany(options),
      this.prisma.track.count({
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
    const data = await this.prisma.track.findFirst({
      where: { id },
      include: {
        room: {
          include: {
            schedule: {
              include: {
                conference_schedule: true,
              },
            },
          },
        },
        track_sessions: true,
      },
    });

    if (!data) throw BaseError.notFound("Track not found.");

    return data;
  }

  async create(value) {
    const createdTrack = await this.prisma.track.create({ data: value });

    return createdTrack;
  }

  async update(id, value, user) {
    const data = await this.prisma.track.findFirst({
      where: { id },
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

    if (!data) throw BaseError.notFound("Track not found.");

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          data.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          data.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to update track in this conference!"
        );
      }
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id: id },
      data: value,
    });

    return updatedTrack;
  }

  async delete(id, user) {
    const data = await this.prisma.track.findFirst({
      where: { id },
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

    if (!data) throw BaseError.notFound("Track not found.");

    if (user.role !== Role.SUPER_ADMIN) {
      if (
        (user.role === Role.ADMIN_ICICYTA &&
          data.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICODSA) ||
        (user.role === Role.ADMIN_ICODSA &&
          data.room.schedule.conference_schedule.type ===
            ConferenceScheduleType.ICICYTA)
      ) {
        throw BaseError.forbidden(
          "You are not allowed to delete track in this conference!"
        );
      }
    }

    const deletedTrack = await this.prisma.track.delete({
      where: { id },
    });

    return {
      data: deletedTrack,
      message: "Track and its associated data permanently deleted.",
    };
  }
}

export default new TrackService();
