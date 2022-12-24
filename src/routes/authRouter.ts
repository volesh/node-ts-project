import * as express from 'express';
import { authController } from '../controllers';
import { userMiddleware } from '../middlewares';

const authRouter = express.Router();

authRouter.post('/login', userMiddleware.isUserExist('email'), authController.login);

export {
    authRouter
};
