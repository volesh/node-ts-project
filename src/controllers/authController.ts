import { NextFunction, Response } from 'express';
import {
    IAccessToken, IActionToken, IRequest, IUser
} from '../interfaces';
import { passwordService, sendEmail, tokensService } from '../services';
import { ApiError, errors } from '../errors';
import { authRepository, userRepository } from '../reposetories';
import { emailActionsEnum, tokenTypesEnum } from '../enums';
import { envConfig } from '../configs';

export const authController = {
    login: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
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
    refresh: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
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
    },

    forgotPassword: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { email, _id } = req.user as IUser;
            const { actionToken } = tokensService.generateActionToken({ email });
            const token = await authRepository.createActionToken({
                token: actionToken,
                _user_id: _id,
                tokenType: tokenTypesEnum.FORGOT_PASS_TOKEN
            });
            await sendEmail(
                'volesh2@gmail.com',
                emailActionsEnum.FORGOT_PASS,
                { url: `${envConfig.FRONTEND_URL}?token=${token}` }
            );
            res.json(token);
        } catch (e) {
            next(e);
        }
    },
    changePassword: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const { _user_id: userId, token } = req.tokenInfo as IActionToken;
            const password = await passwordService.hashPassword(req.body.password);
            const newUserInfo = await userRepository.updateById(userId, { password });
            await authRepository.deleteActionToken({ token, _user_id: userId });
            res.json(newUserInfo);
        } catch (e) {
            next(e);
        }
    }
};
