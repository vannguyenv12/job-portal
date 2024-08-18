import Joi from 'joi';

export const userCreateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required()
});

export const userUpdateNameSchema = Joi.object({
  name: Joi.string().required()
});

export const userUpdatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required()
});

export const userUpdateStatusSchema = Joi.object({
  status: Joi.boolean().required()
});
