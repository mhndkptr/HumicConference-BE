const conferenceScheduleQueryConfig = {
  searchableFields: [],
  filterableFields: ["type", "year"],
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
