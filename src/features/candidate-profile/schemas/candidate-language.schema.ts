import Joi from 'joi';

export const candidateLanguageCreateSchema = Joi.object({
  languageName: Joi.string().required(),
  level: Joi.string().required()
});

export const candidateLanguageUpdateSchema = Joi.object({
  level: Joi.string().required()
});
