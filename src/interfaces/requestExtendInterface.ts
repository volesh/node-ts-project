import { Request } from 'express';
import { IUser } from './userInterface';
import { IAccessToken } from './accessTokenInterface';
import { IActionToken } from './actionTokenInterface';

export interface IRequest extends Request {
    user?: IUser
    tokenInfo?: IAccessToken | IActionToken
}
