import {
    Schema, model, Model, Document
} from 'mongoose';
import { IAccessToken } from '../interfaces';

export type AccessTokenType = IAccessToken & Document

const accessSchema: Schema = new Schema<IAccessToken>(
    {
        _user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
        accessToken: { type: String, require: true },
        refreshToken: { type: String, require: true }
    },
    { timestamps: true }
);

export const AuthDb: Model<AccessTokenType> = model<AccessTokenType>('Auth', accessSchema);
