import Joi from "joi";
import TrackSessionMode from "../../../common/enums/track-session-mode-enum.js";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const getAllTrackSessionParamsSchema = Joi.object({
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
        field: Joi.string()
          .valid("paper_id", "title", "mode", "start_time", "created_at")
          .required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  include_relation: Joi.array().items(Joi.string().valid("track")).optional(),

  filter: Joi.object({
    mode: Joi.string()
      .valid(...Object.values(TrackSessionMode))
      .optional(),

    track_id: Joi.string().uuid().optional(),
  }),
});

const createTrackSessionSchema = Joi.object({
  paper_id: Joi.string().required().messages({
    "string.empty": "Paper ID is required.",
    "any.required": "Paper ID is required.",
  }),

  title: Joi.string().min(3).required().messages({
    "string.empty": "Title is required.",
    "string.min": "Title must be at least 3 characters long.",
    "any.required": "Title is required.",
  }),

  authors: Joi.string().min(3).required().messages({
    "string.empty": "Authors are required.",
    "string.min": "Authors must be at least 3 characters long.",
    "any.required": "Authors are required.",
  }),

  mode: Joi.string()
    .valid(...Object.values(TrackSessionMode))
    .required()
    .messages({
      "any.only": `Mode must be one of: ${Object.values(TrackSessionMode).join(
        ", "
      )}`,
      "string.empty": "Mode is required.",
      "any.required": "Mode is required.",
    }),

  notes: Joi.string().allow(null, ""),

  start_time: Joi.string().pattern(timePattern).required().messages({
    "any.required": "Start time is required.",
    "string.pattern.base": "Start time must be in HH:mm format (e.g., 09:30).",
  }),

  end_time: Joi.string().pattern(timePattern).required().messages({
    "any.required": "End time is required.",
    "string.pattern.base": "End time must be in HH:mm format (e.g., 17:00).",
  }),

  track_id: Joi.string().uuid().required().messages({
    "string.empty": "Track ID is required.",
    "string.uuid": "Track ID must be a valid UUID.",
    "any.required": "Track ID is required.",
  }),
});

const updateTrackSessionSchema = Joi.object({
  paper_id: Joi.string().messages({
    "string.empty": "Paper ID cannot be empty.",
  }),

  title: Joi.string().min(3).messages({
    "string.empty": "Title cannot be empty.",
    "string.min": "Title must be at least 3 characters long.",
  }),

  authors: Joi.string().min(3).messages({
    "string.empty": "Authors cannot be empty.",
    "string.min": "Authors must be at least 3 characters long.",
  }),

  mode: Joi.string()
    .valid(...Object.values(TrackSessionMode))
    .messages({
      "any.only": `Mode must be one of: ${Object.values(TrackSessionMode).join(
        ", "
      )}`,
    }),

  notes: Joi.string().allow(null, ""),

  start_time: Joi.string().pattern(timePattern).messages({
    "string.pattern.base": "Start time must be in HH:mm format (e.g., 09:30).",
  }),

  end_time: Joi.string().pattern(timePattern).messages({
    "string.pattern.base": "End time must be in HH:mm format (e.g., 17:00).",
  }),

  track_id: Joi.string().uuid().messages({
    "string.uuid": "Track ID must be a valid UUID.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to perform an update.",
  });

export {
  createTrackSessionSchema,
  updateTrackSessionSchema,
  getAllTrackSessionParamsSchema,
};
