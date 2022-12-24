import * as dotenv from 'dotenv';

dotenv.config();
export const envConfig = {
    PORT: process.env.PORT,
    MONGO_SERVER: process.env.MONGO_SERVER,
    FRONTEND_URL: process.env.FRONTEND_URL,

    ACCESS_KEY_WORD: process.env.ACCESS_KEY_WORD || 'lskdfglfdjhg',
    REFRESH_KEY_WORD: process.env.REFRESH_KEY_WORD || 'sldfgjvmsfgfgfd',
    FORGOT_PASS_KEY_WORD: process.env.FORGOT_PASS_KEY_WORD || 'sfdgvnhisufxhe',

    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_MESSAGING_SERVICE_SID: process.env.TWILIO_MESSAGING_SERVICE_SID
};
