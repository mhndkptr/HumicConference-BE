const roomQueryConfig = {
  searchableFields: ["name", "identifier", "description"],
  filterableFields: ["type", "schedule_id", "track_id"],
  hasSoftDelete: false,
  relations: {
    schedule: true,
    track: {
      include: {
        track_sessions: true,
      },
    },
  },
};

export default roomQueryConfig;
