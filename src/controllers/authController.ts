import { NextFunction, Response } from 'express';
import { IRequest, IUser } from '../interfaces';
import { passwordHelper, tokensHelper } from '../helpers';
import { ApiError, errors } from '../errors';
import { authService } from '../services';

export const authController = {
    login: async (req:IRequest, res:Response, next:NextFunction) => {
        try {
            const { _id, email, password } = req.user as IUser;
            const loginInfo = req.body;

            await passwordHelper.comparePasswords(loginInfo.password, password);

            const tokens = tokensHelper.generateAccessTokenPair({ email });
            if (!tokens) {
                throw new ApiError(
                    errors.UNKNOWN_ERROR.statusCode,
                    errors.UNKNOWN_ERROR.message
                );
            }

            const tokenPair = await authService.createAccessTokenPair({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                _user_id: _id
            });
            res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }
};
