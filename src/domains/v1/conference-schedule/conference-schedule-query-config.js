const conferenceScheduleQueryConfig = {
  searchableFields: [],
  filterableFields: ["type", "year", "is_active"],
  hasSoftDelete: true,
  relations: {
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
};

export default conferenceScheduleQueryConfig;
