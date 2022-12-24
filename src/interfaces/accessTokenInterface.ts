import { Schema } from 'mongoose';

export interface IAccessToken {
    _id: string
    accessToken: string
    refreshToken: string
    _user_id: Schema.Types.ObjectId
    createdAt: string
    updatedAt: string
}
