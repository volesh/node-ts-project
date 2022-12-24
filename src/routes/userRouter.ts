import express from 'express';
import { userController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.post(
    '/',
    userMiddleware.isNewUserValid,
    userMiddleware.isEmailUnique,
    authMiddleware.hashPassword,
    userController.createUser
);

userRouter.get(
    '/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.getById
);

export {
    userRouter
};
