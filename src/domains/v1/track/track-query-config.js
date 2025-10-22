const trackQueryConfig = {
  searchableFields: ["name", "description"],
  filterableFields: [],
  hasSoftDelete: false,
  relations: {
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
};

export default trackQueryConfig;
