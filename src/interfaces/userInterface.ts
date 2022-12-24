import { Schema } from 'mongoose';

export interface IUser {
    _id: Schema.Types.ObjectId
    name: string
    age: number
    email: string
    password: string
    phone?: string
    avatar?: string
    createdAt: string
    updatedAt: string
}
