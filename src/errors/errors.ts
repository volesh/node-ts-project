import { imageConfig } from '../configs';

export const errors = {
    // 400
    USER_REGISTERED: {
        message: 'User is already registered',
        statusCode: 400
    },
    NO_TOKEN: {
        message: 'No token',
        statusCode: 400
    },
    NOT_VALID_REQUEST_BODY: {
        message: 'Request body not valid',
        statusCode: 400
    },
    NOT_VALID_FILE: {
        message: 'Not valid file',
        statusCode: 400
    },
    NOT_VALID_USER_ID: {
        message: 'User id not valid',
        statusCode: 400
    },
    WRONG_EMAIL_OR_PASS: {
        message: 'Wrong email or password',
        statusCode: 400
    },
    NO_FILE_TO_UPLOAD: {
        message: 'No file to upload',
        statusCode: 400
    },
    INVALID_FILE_TO_UPLOAD: {
        message: `Invalid file: max size - ${imageConfig.IMAGE_MAX_SIZE}, available formats: ${imageConfig.IMAGE_MIMETYPES.map((type) => type)}`,
        statusCode: 400
    },
    // 401
    BAD_TOKEN: {
        message: 'Something wrong with token',
        statusCode: 401
    },
    // 404
    NOT_FOUND_ERR: {
        message: 'Record not found',
        statusCode: 404
    },
    // 500
    UNKNOWN_ERROR: {
        message: 'Something went wrong',
        statusCode: 500
    },
    WRONG_ACTION_TYPE: {
        message: 'Wrong action type',
        statusCode: 500
    },
    WRONG_TEMPLATE: {
        message: 'Wrong template',
        statusCode: 500
    }
};
