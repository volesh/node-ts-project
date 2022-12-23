import express from 'express';
import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);

userRouter.get(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserExist('userId', 'params', '_id'),
    userController.getById
);

export {
    userRouter
};
