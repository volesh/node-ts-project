import {
    Schema, model, Model, Document
} from 'mongoose';
import { IActionToken } from '../interfaces';

export type ActionTokenType = IActionToken & Document

const actionTokenSchema: Schema = new Schema<IActionToken>(
    {
        _user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
        token: { type: String, require: true },
        tokenType: { type: String, require: true }
    },
    { timestamps: true }
);

export const TokenDb: Model<ActionTokenType> = model<ActionTokenType>('Token', actionTokenSchema);
