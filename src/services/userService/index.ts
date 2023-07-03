import api from "../api";
import { IUserRegister } from '@/types/User';

export async function getUsersService() {
    return await api.get('user/GetUsers');
}

export async function createUser(user: IUserRegister) {
    return await api.post('user/CreateUser', user);
}