import { NextFunction, Request, Response } from 'express';
import Joi, { Schema } from 'joi';
import HTTP_STATUS from '../constants/http.constant';

function formatErrorMessage(error: Joi.ValidationError) {
  return error.details.map((item) => item.message);
}

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Validation Error',
        error: formatErrorMessage(error)
      });
    }

    next();
  };
}
