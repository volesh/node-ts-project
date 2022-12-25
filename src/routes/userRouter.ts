import express from 'express';
import { userController } from '../controllers';
import { authMiddleware, fileMiddleware, userMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.post(
    '/',
    userMiddleware.isNewUserValid,
    userMiddleware.isEmailUnique,
    userController.createUser
);

userRouter.get(
    '/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.isAccessTokenValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.getById
);
userRouter.put(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserForUpdateValid,
    authMiddleware.isAccessTokenValid,
    userController.updateById
);
userRouter.delete(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.deleteUser
);
userRouter.patch(
    '/:userId/avatar',
    userMiddleware.isUserIdValid,
    authMiddleware.isAccessTokenValid,
    fileMiddleware.checkUploadImage,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.uploadAvatar
);

export {
    userRouter
};
