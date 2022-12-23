import express from 'express';
import { userRouter } from './userRouter';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);

export {
    apiRouter
};
