const userQueryConfig = {
  searchableFields: ["name", "email"],
  filterableFields: ["role"],
  hasSoftDelete: true,
  relations: {},
  omit: {
    password: true,
  },
};

export default userQueryConfig;
