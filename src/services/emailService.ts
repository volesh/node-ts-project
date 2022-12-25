import * as nodemailer from 'nodemailer';
import hbs, { TemplateOptions } from 'nodemailer-express-handlebars';
import path from 'node:path';
import { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { envConfig } from '../configs';
import { emailActionsEnum } from '../enums';
import { emailTemplates } from '../emailTemplates';
import { ApiError, errors } from '../errors';

export const sendEmail = async (
    receiver:string,
    emailAction: emailActionsEnum,
    context:any = {}
):Promise<SentMessageInfo> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envConfig.EMAIL,
            pass: envConfig.PASSWORD
        }
    });
    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo.subject || !templateInfo.templateName) {
        throw new ApiError(errors.WRONG_TEMPLATE.statusCode, errors.WRONG_TEMPLATE.message);
    }

    const options = {
        viewEngine: {
            defaultLayout: path.join(process.cwd(), 'src', 'emailTemplates', 'layouts', 'maine'),
            layoutDir: path.join(process.cwd(), 'src', 'emailTemplates', 'layouts'),
            partialsDir: path.join(process.cwd(), 'src', 'emailTemplates', 'partials'),
            extname: '.hbs'
        },
        extName: '.hbs',
        viewPath: path.join(process.cwd(), 'src', 'emailTemplates', 'views')
    };

    transporter.use('compile', hbs(options));

    return transporter.sendMail({
        from: 'Node project',
        to: receiver,
        subject: templateInfo.subject,
        template: templateInfo.templateName,
        context
    } as Mail.Options & TemplateOptions);
};
