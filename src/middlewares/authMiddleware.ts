import { NextFunction, Response } from 'express';
import { IRequest, IUser } from '../interfaces';
import { passwordHelper } from '../helpers';
import { ApiError, errors } from '../errors';
import { authService } from '../services';
import { tokenTypesEnum } from '../enums';

export const authMiddleware = {
    hashPassword: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const userInfo:IUser = req.body;
            req.body.password = await passwordHelper.hashPassword(userInfo.password);
            next();
        } catch (e) {
            next(e);
        }
    },

    isAccessTokenValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { userId } = req.params;
            const token = req.get('Authorization');
            if (!token) {
                throw new ApiError(errors.NO_TOKEN.statusCode, errors.NO_TOKEN.message);
            }
            const isToken = await authService.findByParams({ _user_id: userId, accessToken: token });
            if (!isToken) {
                throw new ApiError(errors.BAD_TOKEN.statusCode, errors.BAD_TOKEN.message);
            }
            await authService.checkToken(token, tokenTypesEnum.ACCESS_TOKEN);
            next();
        } catch (e) {
            next(e);
        }
    }
};
