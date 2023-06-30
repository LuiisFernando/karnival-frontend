import api from "../api";

export async function getUsersService() {
    return await api.get('user/GetUsers');
}