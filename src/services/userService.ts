import { IUser } from '../interfaces';
import { UserDb } from '../models';

export const userService = {
    getAll: async ():Promise<IUser[]> => {
        return UserDb.find();
    },
    getUserByParams: async (dbField: string, fieldToSearch: string):Promise<IUser|null> => {
        return UserDb.findOne({ [dbField]: fieldToSearch });
    },
    createUser: async (user:IUser):Promise<IUser> => {
        return UserDb.create(user);
    }
};
