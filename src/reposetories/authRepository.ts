import * as jwt from 'jsonwebtoken';

import { IAccessToken, IActionToken } from '../interfaces';
import { AuthDb, TokenDb } from '../models';
import { tokenTypesEnum } from '../enums';
import { envConfig } from '../configs/envConfig';
import { ApiError, errors } from '../errors';

export const authRepository = {
    findAccessByParams: async (data:any):Promise<IAccessToken | null> => {
        return AuthDb.findOne(data);
    },
    findActionByParams: async (token: string, tokenType: string):Promise<IActionToken|null> => {
        return TokenDb.findOne({ token, tokenType });
    },
    createAccessTokenPair: async (data: Partial<IAccessToken>):Promise<IAccessToken> => {
        return AuthDb.create(data);
    },
    createActionToken: async (data: Partial<IActionToken>):Promise<IActionToken> => {
        return TokenDb.create(data);
    },
    deleteActionToken: async (data: Partial<IActionToken>):Promise<IActionToken|null> => {
        return TokenDb.findOneAndDelete(data);
    },
    checkToken: async (token:string, tokenType:string):Promise<jwt.VerifyErrors|null> => {
        try {
            let secretWord = '';
            switch (tokenType) {
            case tokenTypesEnum.ACCESS_TOKEN:
                secretWord = envConfig.ACCESS_KEY_WORD;
                break;
            case tokenTypesEnum.REFRESH_TOKEN:
                secretWord = envConfig.REFRESH_KEY_WORD;
                break;
            case tokenTypesEnum.FORGOT_PASS_TOKEN:
                secretWord = envConfig.FORGOT_PASS_KEY_WORD;
                break;
            default:
                throw new ApiError(
                    errors.WRONG_ACTION_TYPE.statusCode,
                    errors.WRONG_ACTION_TYPE.message
                );
            }
            const isToken = await jwt.verify(token, secretWord) as Promise<jwt.VerifyErrors|null>;
            return isToken;
        } catch (e) {
            throw new ApiError(errors.BAD_TOKEN.statusCode, errors.BAD_TOKEN.message);
        }
    }
};
