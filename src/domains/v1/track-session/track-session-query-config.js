const trackSessionQueryConfig = {
  searchableFields: ["title", "paper_id", "authors"],
  filterableFields: ["track_id", "mode"],
  hasSoftDelete: false,
  relations: {
    track: {
      include: {
        room: true,
      },
    },
  },
};

export default trackSessionQueryConfig;
