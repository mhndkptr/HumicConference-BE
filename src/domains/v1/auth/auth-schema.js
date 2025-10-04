import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

export { loginSchema };
