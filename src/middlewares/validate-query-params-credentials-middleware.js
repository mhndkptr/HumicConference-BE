const validateQueryParamsCredentials = (schema) => (req, res, next) => {
  const validated = schema.validate(req.query, {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
    convert: true,
  });

  if (validated.error) {
    next(validated.error);
  } else {
    req.validatedQuery = validated.value;
    next();
  }
};

export default validateQueryParamsCredentials;
