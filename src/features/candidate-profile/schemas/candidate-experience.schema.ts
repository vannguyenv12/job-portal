import Joi from 'joi';

export const candidateExperienceCreateSchema = Joi.object({
  company: Joi.string().required(),
  department: Joi.string().required(),
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().optional(),
  responsibilities: Joi.string().required()
});

export const candidateExperienceUpdateSchema = Joi.object({
  company: Joi.string().optional(),
  department: Joi.string().optional(),
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  responsibilities: Joi.string().optional()
});
