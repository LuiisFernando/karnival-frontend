import api from "../api";
import { IUser, IUserCreate, IUserCreateRequest } from '@/types/User';

export async function getUsersService() {
    return await api.get<IUser[]>('user/GetUsers');
}

export async function createUser(user: IUserCreate) {
    const userRequest: IUserCreateRequest = {
        email: user.email,
        name: user.name,
        role: Number(user.role.value)
    };
    return await api.post('user/CreateUser', userRequest);
}