const validateParamsCredentials = (schema) => (req, res, next) => {
  const validated = schema.validate(req.params, {
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
    req.validatedParams = validated.value;
    next();
  }
};

export default validateParamsCredentials;
