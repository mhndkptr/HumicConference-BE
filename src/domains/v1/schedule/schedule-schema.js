import JoiDate from "@joi/date";
import JoiBase from "joi";
import ScheduleType from "../../../common/enums/schedule-type-enum.js";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const Joi = JoiBase.extend(JoiDate);

const getAllScheduleParamsSchema = Joi.object({
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
          .valid("date", "start_time", "type", "created_at")
          .required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  include_relation: Joi.array().items(Joi.string().valid("rooms")).optional(),

  filter: Joi.object({
    type: Joi.string()
      .valid(...Object.values(ScheduleType))
      .optional(),

    conference_schedule_id: Joi.string().uuid().optional(),
  }),
});

const createScheduleSchema = Joi.object({
  date: Joi.date().format("YYYY-MM-DD").required().messages({
    "date.base": "Start date must be a valid date.",
    "date.format": "Start date must be in YYYY-MM-DD format.",
    "any.required": "Start date is required.",
  }),

  type: Joi.string()
    .valid(...Object.values(ScheduleType))
    .required()
    .messages({
      "any.only": `Type must be one of: ${Object.values(ScheduleType).join(
        ", "
      )}`,
      "string.empty": "Type is required.",
      "any.required": "Type is required.",
    }),

  start_time: Joi.string()
    .pattern(timePattern)
    .allow(null, "")
    .when("type", {
      is: ScheduleType.ONE_DAY_ACTIVITY,
      then: Joi.forbidden().messages({
        "any.forbidden": "Start time must be empty for ONE_DAY_ACTIVITY.",
      }),
      otherwise: Joi.required(),
    })
    .messages({
      "any.required": "Start time is required.",
      "string.pattern.base":
        "Start time must be in HH:mm format (e.g., 09:30).",
    }),

  end_time: Joi.string()
    .pattern(timePattern)
    .allow(null, "")
    .when("type", {
      is: ScheduleType.ONE_DAY_ACTIVITY,
      then: Joi.forbidden().messages({
        "any.forbidden": "End time must be empty for ONE_DAY_ACTIVITY.",
      }),
      otherwise: Joi.required(),
    })
    .messages({
      "any.required": "End time is required.",
      "string.pattern.base": "End time must be in HH:mm format (e.g., 17:00).",
    }),

  notes: Joi.string().when("type", {
    is: ScheduleType.ONE_DAY_ACTIVITY,
    then: Joi.string().required().messages({
      "string.empty": "Notes are required for ONE_DAY_ACTIVITY.",
      "any.required": "Notes are required for ONE_DAY_ACTIVITY.",
    }),
    otherwise: Joi.string().allow(null, ""),
  }),

  conference_schedule_id: Joi.string().uuid().required().messages({
    "string.empty": "Conference schedule ID is required.",
    "string.base": "Conference schedule ID must be a string.",
    "string.uuid": "Conference schedule ID must be a valid UUID.",
    "any.required": "Conference schedule ID is required.",
  }),
});

const updateScheduleSchema = Joi.object({
  date: Joi.date().format("YYYY-MM-DD").messages({
    "date.base": "Start date must be a valid date.",
    "date.format": "Start date must be in YYYY-MM-DD format.",
  }),

  type: Joi.string()
    .valid(...Object.values(ScheduleType))
    .messages({
      "any.only": `Type must be one of: ${Object.values(ScheduleType).join(
        ", "
      )}`,
    }),

  start_time: Joi.string()
    .pattern(timePattern)
    .allow(null, "")
    .when("type", {
      is: ScheduleType.ONE_DAY_ACTIVITY,
      then: Joi.forbidden().messages({
        "any.forbidden": "Start time must be empty for ONE_DAY_ACTIVITY.",
      }),
      otherwise: Joi.optional(),
    })
    .messages({
      "string.pattern.base":
        "Start time must be in HH:mm format (e.g., 09:30).",
    }),

  end_time: Joi.string()
    .pattern(timePattern)
    .allow(null, "")
    .when("type", {
      is: ScheduleType.ONE_DAY_ACTIVITY,
      then: Joi.forbidden().messages({
        "any.forbidden": "End time must be empty for ONE_DAY_ACTIVITY.",
      }),
      otherwise: Joi.optional(),
    })
    .messages({
      "string.pattern.base": "End time must be in HH:mm format (e.g., 17:00).",
    }),

  notes: Joi.string().when("type", {
    is: ScheduleType.ONE_DAY_ACTIVITY,
    then: Joi.string().required().messages({
      "string.empty": "Notes are required for ONE_DAY_ACTIVITY.",
      "any.required": "Notes are required for ONE_DAY_ACTIVITY.",
    }),
    otherwise: Joi.string().allow(null, ""),
  }),

  conference_schedule_id: Joi.string().uuid().messages({
    "string.base": "Conference schedule ID must be a string.",
    "string.uuid": "Conference schedule ID must be a valid UUID.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to perform an update.",
  });

export {
  createScheduleSchema,
  updateScheduleSchema,
  getAllScheduleParamsSchema,
};
