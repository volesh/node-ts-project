import { IUser } from '../interfaces';
import { UserDb } from '../models';

export const userRepository = {
    getAll: async ():Promise<IUser[]> => {
        return UserDb.find();
    },
    getUserByParams: async (dbField: string, fieldToSearch: string):Promise<IUser|null> => {
        return UserDb.findOne({ [dbField]: fieldToSearch });
    },
    createUser: async (user:IUser):Promise<IUser> => {
        return UserDb.create(user);
    },
    updateById: async (userId: string, userInfo: Partial<IUser>):Promise<IUser|null> => {
        return UserDb.findByIdAndUpdate(userId, userInfo, { new: true });
    },
    deleteById: async (userId: string):Promise<IUser|null> => {
        return UserDb.findByIdAndDelete(userId);
    }
};
