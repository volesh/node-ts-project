import { NextFunction, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose'
import { IRequest } from '../interfaces';
import { userService } from '../services';

export const userMiddleware = {
    isUserExist: (fieldName: string, findIn = 'body', dbField = fieldName) => async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const searchParams = req[findIn as keyof typeof req][fieldName];
            const user = await userService.getUserByParams(dbField, searchParams);
            if (!user) {
                throw new Error('User not Found');
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req:IRequest, res:Response, next:NextFunction) => {
        try {
            const { userId } = req.params;
            const isValid = isObjectIdOrHexString(userId);
            if (!isValid) {
                throw new Error('User id not valid');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
