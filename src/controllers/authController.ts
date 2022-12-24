import { NextFunction, Response } from 'express';
import { IAccessToken, IRequest, IUser } from '../interfaces';
import { passwordService, tokensService } from '../services';
import { ApiError, errors } from '../errors';
import { authRepository } from '../reposetories';

export const authController = {
    login: async (req:IRequest, res:Response, next:NextFunction) => {
        try {
            const { _id, email, password } = req.user as IUser;
            const loginInfo = req.body;

            await passwordService.comparePasswords(loginInfo.password, password);

            const tokens = tokensService.generateAccessTokenPair({ email });
            if (!tokens) {
                throw new ApiError(
                    errors.UNKNOWN_ERROR.statusCode,
                    errors.UNKNOWN_ERROR.message
                );
            }

            const tokenPair = await authRepository.createAccessTokenPair({
                ...tokens,
                _user_id: _id
            });
            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req:IRequest, res:Response, next:NextFunction) => {
        try {
            const { _user_id: userId } = req.tokenInfo as IAccessToken;
            const tokens = tokensService.generateAccessTokenPair({ userId });
            const newTokenPair = await authRepository.createAccessTokenPair({
                ...tokens,
                _user_id: userId
            });
            res.json(newTokenPair);
        } catch (e) {
            next(e);
        }
    }
};
