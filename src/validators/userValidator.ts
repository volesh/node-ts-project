import * as Joi from 'joi';
import { RegExpEnum } from '../enums';

export const userValidator = {
    newUserValidator: Joi.object({
        name: Joi.string().trim().required(),
        age: Joi.number().max(120).min(15).required(),
        email: Joi.string()
            .trim()
            .lowercase()
            .regex(RegExpEnum.EMAIL)
            .required(),
        password: Joi.string().trim().regex(RegExpEnum.PASSWORD).required(),
        phone: Joi.string().trim().regex(RegExpEnum.PHONE),
    })
};
