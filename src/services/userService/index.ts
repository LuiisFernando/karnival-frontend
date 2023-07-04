import api from "../api";
import { IUser, IUserCreate } from '@/types/User';

export async function getUsersService() {
    return await api.get<IUser[]>('user/GetUsers');
}

export async function createUser(user: IUserCreate) {
    return await api.post('user/CreateUser', user);
}