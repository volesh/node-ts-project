import { NextFunction, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import { IRequest } from '../interfaces';
import { userRepository } from '../reposetories';
import { ApiError, errors } from '../errors';
import { userValidator } from '../validators';

export const userMiddleware = {
    isUserExist: (fieldName: string, findIn = 'body', dbField = fieldName) => async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const searchParams = req[findIn as keyof typeof req][fieldName];
            const user = await userRepository.getUserByParams(dbField, searchParams);
            if (!user) {
                throw new ApiError(errors.NOT_FOUND_ERR.statusCode, errors.NOT_FOUND_ERR.message);
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req:IRequest, res:Response, next:NextFunction):void => {
        try {
            const { userId } = req.params;
            const isValid = isObjectIdOrHexString(userId);
            if (!isValid) {
                throw new ApiError(
                    errors.NOT_VALID_USER_ID.statusCode,
                    errors.NOT_VALID_USER_ID.message
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isNewUserValid: (req:IRequest, res:Response, next:NextFunction):void => {
        try {
            const userInfo = req.body;
            const validate = userValidator.newUserValidator.validate(userInfo);
            if (validate.error) {
                throw new ApiError(
                    errors.NOT_VALID_REQUEST_BODY.statusCode,
                    errors.NOT_VALID_REQUEST_BODY.message
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserForUpdateValid: (req:IRequest, res:Response, next:NextFunction):void => {
        try {
            const userInfo = req.body;
            const validate = userValidator.userForUpdateValidator.validate(userInfo);
            if (validate.error) {
                throw new ApiError(
                    errors.NOT_VALID_REQUEST_BODY.statusCode,
                    errors.NOT_VALID_REQUEST_BODY.message
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailUnique: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { email } = req.body;
            if (!email) {
                throw new ApiError(
                    errors.NOT_VALID_REQUEST_BODY.statusCode,
                    errors.NOT_VALID_REQUEST_BODY.message
                );
            }
            const user = await userRepository.getUserByParams('email', email);

            if (user) {
                throw new ApiError(
                    errors.USER_REGISTERED.statusCode,
                    errors.USER_REGISTERED.message
                );
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
