import { Request } from 'express';
import { IUser } from './userInterface';
import { IAccessToken } from './accessTokenInterface';

export interface IRequest extends Request {
    user?: IUser
    tokenInfo?: IAccessToken
}
