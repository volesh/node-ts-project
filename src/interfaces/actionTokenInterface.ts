import { Schema } from 'mongoose';

export interface IActionToken {
    _id: Schema.Types.ObjectId
    token: string
    tokenType: string
    _user_id: Schema.Types.ObjectId
    createdAt: string
    updatedAt: string
}
