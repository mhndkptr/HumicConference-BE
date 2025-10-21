const conferenceScheduleQueryConfig = {
  searchableFields: [],
  filterableFields: ["type", "year"],
  hasSoftDelete: true,
  relations: {
    schedules: {
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
    },
  },
};

export default conferenceScheduleQueryConfig;
