import { Request } from 'express';
import { IUser } from './userInterface';

export interface IRequest extends Request {
    user?: IUser
}
