import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces';
import { userService } from '../services';

export const userController = {
    getAll: async (req:IRequest, res:Response, next:NextFunction):Promise<void> => {
        try {
            const user = await userService.getAll();
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
            const user = req.body;
            const newUser = await userService.createUser(user);
            res.json(newUser);
        } catch (e) {
            next(e);
        }
    }
};
