import api from "../api";
import { IUser, IUserCreate, IUserCreateRequest, IUserEdit, IUserEditRequest } from '@/types/User';

export async function getUsersService() {
    return await api.get<IUser[]>('user/GetUsers');
}

export async function createUser(user: IUserCreate) {
    const userRequest: IUserCreateRequest = {
        email: user.email,
        name: user.name,
        role: Number(user.roleProps.value)
    };
    return await api.post('user/CreateUser', userRequest);
}

export async function getUserByIdService(id: number) {
    return await api.get<IUserEdit>(`user/GetUser/${id}`);
}

export async function updateUserService(user: IUserEditRequest) {
    return await api.put('user/UpdateUser', user);
}

export async function deleteUser(id: number) {
    return await api.put(`user/InactiveUser/${id}`);
}

export async function activeUser(id: number) {
    return await api.put(`user/ActiveUser/${id}`);
}