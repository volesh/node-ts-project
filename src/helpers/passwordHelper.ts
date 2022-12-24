import * as bcrypt from 'bcrypt';
import { ApiError, errors } from '../errors';

export const passwordHelper = {
    hashPassword: async (pass:string):Promise<string> => bcrypt.hash(pass, 10),
    comparePasswords: async (pass:string, hashPass:string):Promise<void> => {
        const isSame = await bcrypt.compare(pass, hashPass);

        if (!isSame) {
            throw new ApiError(
                errors.WRONG_EMAIL_OR_PASS.statusCode,
                errors.WRONG_EMAIL_OR_PASS.message
            );
        }
    }
};
