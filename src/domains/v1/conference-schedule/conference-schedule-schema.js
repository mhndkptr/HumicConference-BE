import JoiDate from "@joi/date";
import JoiBase from "joi";
import ConferenceScheduleType from "../../../common/enums/conference-schedule-type-enum.js";

const Joi = JoiBase.extend(JoiDate);

const getConferenceScheduleActiveParamsSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(ConferenceScheduleType))
    .required()
    .messages({
      "any.only": `Type must be one of: ${Object.values(
        ConferenceScheduleType
      ).join(", ")}`,
      "string.empty": "Type is required.",
      "any.required": "Type is required.",
    }),
});

const getConferenceScheduleForUserViewParamsSchema = Joi.object({
  year: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Year is required.",
      "string.length": "Year must be 4 digits (e.g., 2025).",
      "string.pattern.base": "Year must only contain numbers.",
    }),
  type: Joi.string()
    .valid(...Object.values(ConferenceScheduleType))
    .required()
    .messages({
      "any.only": `Type must be one of: ${Object.values(
        ConferenceScheduleType
      ).join(", ")}`,
      "string.empty": "Type is required.",
      "any.required": "Type is required.",
    }),
});

const getAllConferenceScheduleParamsSchema = Joi.object({
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
          .valid("year", "type", "start_date", "name", "created_at")
          .required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  include_relation: Joi.array()
    .items(Joi.string().valid("schedules"))
    .optional(),

  filter: Joi.object({
    type: Joi.string()
      .valid(ConferenceScheduleType.ICICYTA, ConferenceScheduleType.ICODSA)
      .optional(),
    year: Joi.string().min(4).max(4).optional(),
    is_active: Joi.boolean().optional(),
  }),
});

const createConferenceScheduleSchema = Joi.object({
  name: Joi.string().min(5).max(255).required().messages({
    "string.empty": "Conference name is required.",
    "string.min": "Conference name must be at least 5 characters long.",
    "string.max": "Conference name cannot exceed 255 characters.",
  }),

  description: Joi.string().min(10).required().messages({
    "string.empty": "Description is required.",
    "string.min": "Description must be at least 10 characters long.",
  }),

  year: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Year is required.",
      "string.length": "Year must be 4 digits (e.g., 2025).",
      "string.pattern.base": "Year must only contain numbers.",
    }),

  start_date: Joi.date().format("YYYY-MM-DD").required().messages({
    "date.base": "Start date must be a valid date.",
    "date.format": "Start date must be in YYYY-MM-DD format.",
    "any.required": "Start date is required.",
  }),

  end_date: Joi.date()
    .format("YYYY-MM-DD")
    .greater(Joi.ref("start_date"))
    .required()
    .messages({
      "date.base": "End date must be a valid date.",
      "date.format": "End date must be in YYYY-MM-DD format.",
      "any.required": "End date is required.",
      "date.greater": "End date must be after the start date.",
    }),

  type: Joi.string()
    .valid(...Object.values(ConferenceScheduleType))
    .required()
    .messages({
      "any.only": `Type must be one of: ${Object.values(
        ConferenceScheduleType
      ).join(", ")}`,
      "string.empty": "Type is required.",
      "any.required": "Type is required.",
    }),

  is_active: Joi.boolean().required().messages({
    "boolean.base": "Is active must be a boolean.",
    "any.required": "Is active is required.",
  }),

  contact_email: Joi.string().email().required().messages({
    "string.empty": "Contact email is required.",
    "string.email": "Contact email must be a valid email address.",
  }),

  timezone_iana: Joi.string().min(3).required().messages({
    "string.empty": "Timezone IANA is required.",
    "string.min": "Timezone IANA must be a valid string (e.g., Asia/Jakarta).",
  }),

  onsite_presentation: Joi.string().min(10).required().messages({
    "string.empty": "Onsite presentation details are required.",
    "string.min":
      "Onsite presentation details must be at least 10 characters long.",
  }),

  online_presentation: Joi.string().min(10).required().messages({
    "string.empty": "Online presentation details are required.",
    "string.min":
      "Online presentation details must be at least 10 characters long.",
  }),

  notes: Joi.string().allow(null, ""),

  no_show_policy: Joi.string().allow(null, ""),
});

const updateConferenceScheduleSchema = Joi.object({
  name: Joi.string().min(5).max(255).messages({
    "string.min": "Conference name must be at least 5 characters long.",
    "string.max": "Conference name cannot exceed 255 characters.",
  }),

  description: Joi.string().min(10).messages({
    "string.min": "Description must be at least 10 characters long.",
  }),

  year: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.length": "Year must be 4 digits (e.g., 2025).",
      "string.pattern.base": "Year must only contain numbers.",
    }),

  start_date: Joi.date().format("YYYY-MM-DD").messages({
    "date.base": "Start date must be a valid date.",
    "date.format": "Start date must be in YYYY-MM-DD format.",
  }),

  end_date: Joi.date()
    .format("YYYY-MM-DD")
    .greater(Joi.ref("start_date"))
    .messages({
      "date.base": "End date must be a valid date.",
      "date.format": "End date must be in YYYY-MM-DD format.",
      "date.greater": "End date must be after the start date.",
    }),

  type: Joi.string()
    .valid(...Object.values(ConferenceScheduleType))
    .messages({
      "any.only": `Type must be one of: ${Object.values(
        ConferenceScheduleType
      ).join(", ")}`,
    }),

  is_active: Joi.boolean().messages({
    "boolean.base": "Is active must be a boolean.",
  }),

  contact_email: Joi.string().email().messages({
    "string.email": "Contact email must be a valid email address.",
  }),

  timezone_iana: Joi.string().min(3).messages({
    "string.min": "Timezone IANA must be a valid string (e.g., Asia/Jakarta).",
  }),

  onsite_presentation: Joi.string().min(10).messages({
    "string.min":
      "Onsite presentation details must be at least 10 characters long.",
  }),

  online_presentation: Joi.string().min(10).messages({
    "string.min":
      "Online presentation details must be at least 10 characters long.",
  }),

  notes: Joi.string().allow(null, ""),

  no_show_policy: Joi.string().allow(null, ""),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to perform an update.",
  });

const deleteConferenceScheduleParamsSchema = Joi.object({
  permanent: Joi.boolean().optional().default(false).messages({
    "boolean.base": "Permanent must be a boolean.",
  }),
});

export {
  createConferenceScheduleSchema,
  updateConferenceScheduleSchema,
  deleteConferenceScheduleParamsSchema,
  getAllConferenceScheduleParamsSchema,
  getConferenceScheduleForUserViewParamsSchema,
  getConferenceScheduleActiveParamsSchema,
};
