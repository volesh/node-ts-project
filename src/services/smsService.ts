import { Twilio } from 'twilio';
import { envConfig } from '../configs';
import { newUserTemplate } from '../smsTemplates';

const client = new Twilio(
    envConfig.TWILIO_ACCOUNT_SID as string,
    envConfig.TWILIO_AUTH_TOKEN as string
);

export const sendSms = async (body: number, phone: string):Promise<void> => {
    try {
        await client.messages.create({
            body: newUserTemplate[body],
            messagingServiceSid: envConfig.TWILIO_MESSAGING_SERVICE_SID,
            to: phone
        });
    } catch (e: any) {
        console.log(e.message);
    }
};
