import Joi from "joi";
import Role from "../../../common/enums/role-enum.js";

const getAllUsersParamsSchema = Joi.object({
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
          .valid("name", "email", "created_at", "updated_at", "deleted_at")
          .required(),
        direction: Joi.string().valid("asc", "desc").default("asc"),
      })
    )
    .optional(),

  search: Joi.string().min(1).max(100).optional(),

  filter: Joi.object({
    role: Joi.string()
      .valid(Role.ADMIN_ICICYTA, Role.ADMIN_ICODSA, Role.SUPER_ADMIN)
      .optional(),
  }),
});

const createUserSchema = Joi.object({
  name: Joi.string().required().min(4).messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 4 characters long.",
  }),
  email: Joi.string().required().email().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.base":
        "Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 special character.",
    }),
  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Password confirmation is required.",
      "any.only": "Password confirmation does not match password.",
    }),
  role: Joi.string()
    .valid(Role.ADMIN_ICICYTA, Role.ADMIN_ICODSA)
    .required()
    .messages({
      "any.only": `Role must be one of ${Role.ADMIN_ICICYTA}, ${Role.ADMIN_ICODSA}.`,
      "string.empty": "Role is required.",
    }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().optional().min(4).messages({
    "string.min": "Name must be at least 4 characters long.",
  }),
  email: Joi.string().optional().email().messages({
    "string.email": "Email must be a valid email address.",
  }),
  role: Joi.string()
    .valid(Role.ADMIN_ICICYTA, Role.ADMIN_ICODSA)
    .optional()
    .messages({
      "any.only": `Role must be one of ${Role.ADMIN_ICICYTA}, ${Role.ADMIN_ICODSA}.`,
    }),
});

const deleteUserParamsSchema = Joi.object({
  permanent: Joi.boolean().optional().default(false).messages({
    "boolean.base": "Permanent must be a boolean.",
  }),
});

export {
  createUserSchema,
  updateUserSchema,
  deleteUserParamsSchema,
  getAllUsersParamsSchema,
};
