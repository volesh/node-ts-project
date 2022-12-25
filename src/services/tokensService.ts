import * as jwt from 'jsonwebtoken';
import { IAccessToken } from '../interfaces';
import { envConfig } from '../configs/envConfig';

export const tokensService = {
    generateAccessTokenPair: (body:any):Partial<IAccessToken> => {
        const accessToken = jwt.sign(body, envConfig.ACCESS_KEY_WORD, { expiresIn: '1d' });
        const refreshToken = jwt.sign(body, envConfig.REFRESH_KEY_WORD, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        };
    },

    generateActionToken: (body:any):{actionToken:string} => {
        const actionToken = jwt.sign(body, envConfig.FORGOT_PASS_KEY_WORD, { expiresIn: '1d' });
        return { actionToken };
    }
};
