import Joi from 'joi';

export const candidateEducationCreateSchema = Joi.object({
  educationId: Joi.number().required(),
  major: Joi.string().required(),
  degree: Joi.string().valid('BACHELOR', 'MASTER', 'ENGINEER').required(),
  yearStart: Joi.number().required(),
  yearEnd: Joi.number().required()
});

export const candidateEducationUpdateSchema = Joi.object({
  major: Joi.string().optional(),
  degree: Joi.string().valid('BACHELOR', 'MASTER', 'ENGINEER').optional(),
  yearStart: Joi.number().optional(),
  yearEnd: Joi.number().optional()
});
