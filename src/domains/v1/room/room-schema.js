import Joi from "joi";
import RoomType from "../../../common/enums/room-type-enum.js";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const getAllRoomParamsSchema = Joi.object({
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
          .valid("name", "identifier", "type", "start_time", "created_at")
          .required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  advSearch: Joi.object({
    conference_schedule_id: Joi.string().uuid().optional(),
    conference_schedule: Joi.object({
      year: Joi.string()
        .length(4)
        .pattern(/^[0-9]+$/)
        .optional()
        .messages({
          "string.length": "Year must be 4 digits (e.g., 2025).",
          "string.pattern.base": "Year must only contain numbers.",
        }),
      type: Joi.string()
        .valid(...Object.values(ConferenceScheduleType))
        .optional()
        .messages({
          "any.only": `Type must be one of: ${Object.values(
            ConferenceScheduleType
          ).join(", ")}`,
        }),
      is_active: Joi.boolean().optional(),
    }).optional(),
  })
    .oxor("conference_schedule_id", "conference_schedule")
    .optional(),

  include_relation: Joi.array()
    .items(Joi.string().valid("schedule", "track"))
    .optional(),

  filter: Joi.object({
    type: Joi.string()
      .valid(...Object.values(RoomType))
      .optional(),
    schedule_id: Joi.string().uuid().optional(),
    track_id: Joi.string().uuid().optional(),
  }),
});

const trackSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Track name is required.",
    "string.min": "Track name must be at least 3 characters long.",
  }),
  description: Joi.string().allow(null, ""),
});

const createRoomSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Room name is required.",
    "string.min": "Room name must be at least 3 characters long.",
    "string.max": "Room name cannot exceed 100 characters.",
  }),

  identifier: Joi.string().allow(null, ""),

  description: Joi.string().allow(null, ""),

  type: Joi.string()
    .valid(RoomType.MAIN, RoomType.PARALLEL)
    .required()
    .messages({
      "any.only": `Type must be one of: ${Object.values(RoomType).join(", ")}`,
      "string.empty": "Room type is required.",
      "any.required": "Room type is required.",
    }),

  online_meeting_url: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Online meeting URL must be a valid URL (e.g., http://...)",
  }),

  start_time: Joi.string()
    .pattern(timePattern)
    .allow(null, "")
    .when("type", {
      is: RoomType.MAIN,
      then: Joi.forbidden().messages({
        "any.forbidden": "Start time must be empty for MAIN rooms.",
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
      is: RoomType.MAIN,
      then: Joi.forbidden().messages({
        "any.forbidden": "End time must be empty for MAIN rooms.",
      }),
      otherwise: Joi.required(),
    })
    .messages({
      "any.required": "End time is required.",
      "string.pattern.base": "End time must be in HH:mm format (e.g., 17:00).",
    }),

  schedule_id: Joi.string().uuid().required().messages({
    "string.empty": "Schedule ID is required.",
    "string.uuid": "Schedule ID must be a valid UUID.",
    "any.required": "Schedule ID is required.",
  }),

  track: Joi.any().when("type", {
    is: RoomType.PARALLEL,
    then: trackSchema.required().messages({
      "any.required": "Track object is required for PARALLEL rooms.",
    }),
    otherwise: Joi.forbidden().messages({
      "any.forbidden": "Track object must not be included for MAIN rooms.",
    }),
  }),
});

const updateRoomSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    "string.min": "Room name must be at least 3 characters long.",
    "string.max": "Room name cannot exceed 100 characters.",
  }),

  identifier: Joi.string().allow(null, ""),

  description: Joi.string().allow(null, ""),

  type: Joi.string()
    .valid(RoomType.MAIN, RoomType.PARALLEL)
    .messages({
      "any.only": `Type must be one of: ${Object.values(RoomType).join(", ")}`,
    }),

  online_meeting_url: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Online meeting URL must be a valid URL.",
  }),

  start_time: Joi.string().pattern(timePattern).messages({
    "string.pattern.base": "Start time must be in HH:mm format (e.g., 09:30).",
  }),

  end_time: Joi.string().pattern(timePattern).messages({
    "string.pattern.base": "End time must be in HH:mm format (e.g., 17:00).",
  }),

  schedule_id: Joi.string().uuid().messages({
    "string.uuid": "Schedule ID must be a valid UUID.",
  }),

  track: Joi.any()
    .when("type", {
      is: RoomType.MAIN,
      then: Joi.forbidden().messages({
        "any.forbidden":
          "Track object is not allowed when setting type to MAIN.",
      }),
    })
    .when("type", {
      is: RoomType.PARALLEL,
      then: trackSchema.required().messages({
        "any.required":
          "Track object is required when setting type to PARALLEL.",
      }),
    })
    .when("type", {
      is: Joi.not(Joi.exist()),
      then: Joi.optional(),
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to perform an update.",
  });

export { createRoomSchema, updateRoomSchema, getAllRoomParamsSchema };
