import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { IRequest } from '../interfaces';
import { ApiError, errors } from '../errors';
import { imageConfig } from '../configs';

export const fileMiddleware = {
    checkUploadImage: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            if (!req.files) {
                throw new ApiError(
                    errors.NO_FILE_TO_UPLOAD.statusCode,
                    errors.NO_FILE_TO_UPLOAD.message
                );
            }
            const imagesToUpload = Object.values(req.files);
            imagesToUpload.forEach((image) => {
                const { size, mimetype } = image as UploadedFile;
                if (
                    !imageConfig.IMAGE_MIMETYPES.includes(mimetype)
                    || size > imageConfig.IMAGE_MAX_SIZE
                ) {
                    throw new ApiError(
                        errors.INVALID_FILE_TO_UPLOAD.statusCode,
                        errors.INVALID_FILE_TO_UPLOAD.message
                    );
                }
            });
            next();
        } catch (e) {
            next(e);
        }
    }
};
