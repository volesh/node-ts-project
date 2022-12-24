import * as express from 'express';
import { authController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlewares';

const authRouter = express.Router();

authRouter.post('/login', userMiddleware.isUserExist('email'), authController.login);
authRouter.post('/refresh', authMiddleware.isRefreshTokenValid, authController.refresh);

export {
    authRouter
};
