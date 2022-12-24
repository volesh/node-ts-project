import express from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

export {
    apiRouter
};
