import Joi from "joi";

const getAllTrackParamsSchema = Joi.object({
  get_all: Joi.boolean().optional().default(true),

  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  }).when("get_all", {
    is: false,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),

  order_by: Joi.array()
    .items(
      Joi.object({
        field: Joi.string().valid("name", "created_at").required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  include_relation: Joi.array()
    .items(Joi.string().valid("room", "track_sessions"))
    .optional(),
});

export { getAllTrackParamsSchema };
