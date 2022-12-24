import {
    Schema, model, Model, Document
} from 'mongoose';
import { IUser } from '../interfaces';

export type UserType = IUser & Document

const userSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, trim: true, required: true },
        age: {
            type: Number,
            min: 15,
            max: 120,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true
        },
        password: { type: String, trim: true, required: true },
        phone: { type: String, trim: true, unique: true },
        avatar: String
    },
    { timestamps: true }
);

const UserDb: Model<UserType> = model<UserType>('User', userSchema);

export { UserDb };
