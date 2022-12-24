import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces';
import { ApiError, errors } from '../errors';
import { authRepository } from '../reposetories';
import { tokenTypesEnum } from '../enums';

export const authMiddleware = {
    isAccessTokenValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { userId } = req.params;
            const token = req.get('Authorization');
            if (!token) {
                throw new ApiError(errors.NO_TOKEN.statusCode, errors.NO_TOKEN.message);
            }
            const isToken = await authRepository.findByParams({
                _user_id: userId,
                accessToken: token
            });
            if (!isToken) {
                throw new ApiError(errors.BAD_TOKEN.statusCode, errors.BAD_TOKEN.message);
            }
            await authRepository.checkToken(token, tokenTypesEnum.ACCESS_TOKEN);
            next();
        } catch (e) {
            next(e);
        }
    },

    isRefreshTokenValid: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const token = req.get('Authorization');
            if (!token) {
                throw new ApiError(errors.NO_TOKEN.statusCode, errors.NO_TOKEN.message);
            }
            const isToken = await authRepository.findByParams({
                refreshToken: token
            });
            if (!isToken) {
                throw new ApiError(errors.BAD_TOKEN.statusCode, errors.BAD_TOKEN.message);
            }
            await authRepository.checkToken(token, tokenTypesEnum.REFRESH_TOKEN);
            req.tokenInfo = isToken;
            next();
        } catch (e) {
            next(e);
        }
    }
};
