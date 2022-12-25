import { emailActionsEnum } from '../enums';

export const emailTemplates:{[index: string]: {subject: string, templateName: string}} = {
    [emailActionsEnum.CREATE_ACCOUNT]: {
        subject: 'Account created',
        templateName: 'createUser'
    },

    [emailActionsEnum.FORGOT_PASS]: {
        subject: 'Forgot password',
        templateName: 'forgotPass'
    },

    [emailActionsEnum.USER_DELETED]: {
        subject: 'Your account deleted',
        templateName: 'deleteUser'
    }
};
