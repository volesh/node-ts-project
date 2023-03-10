import { NextFunction, Response } from 'express';
import { IRequest, IUser } from '../interfaces';
import { userRepository } from '../reposetories';
import {
    passwordService, sendEmail, sendSms, uploadFile
} from '../services';
import { ApiError, errors } from '../errors';
import { emailActionsEnum, SmsActionsEnum } from '../enums';

export const userController = {
    getAll: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const user = await userRepository.getAll();
            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    getById: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const user = req.body as IUser;
            const hashPassword = await passwordService.hashPassword(user.password);
            const newUser = await userRepository.createUser({ ...user, password: hashPassword });
            await Promise.all([
                sendEmail('volesh2@gmail.com', emailActionsEnum.CREATE_ACCOUNT),
                sendSms(SmsActionsEnum.USER_CREATED, '+380682443742')
            ]);
            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },
    updateById: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const userInfo = req.body as Partial<IUser>;
            const { userId } = req.params;
            // Is email for update unique
            if (userInfo.email) {
                const user = await userRepository.getUserByParams('email', userInfo.email);

                if (user) {
                    throw new ApiError(
                        errors.USER_REGISTERED.statusCode,
                        errors.USER_REGISTERED.message
                    );
                }
            }
            const user = await userRepository.updateById(userId, userInfo);
            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            await userRepository.deleteById(req.params.userId);
            await sendEmail('volesh2@gmail.com', emailActionsEnum.USER_DELETED);
            res.json('User deleted');
        } catch (e) {
            next(e);
        }
    },
    uploadAvatar: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const uploadData = await uploadFile(req.files!.avatar, 'users', req.params.userId);
            const updatedUser = await userRepository.updateById(
                req.params.userId,
                { avatar: uploadData.Location }
            );
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
