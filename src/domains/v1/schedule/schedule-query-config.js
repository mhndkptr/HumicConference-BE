const scheduleQueryConfig = {
  searchableFields: [],
  filterableFields: ["type", "conference_schedule_id"],
  hasSoftDelete: false,
  relations: {
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
};

export default scheduleQueryConfig;
