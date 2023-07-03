import api from "../api";
import { ILoginResponse } from "@/types/User";

export async function loginService(email: string, password: string) {
    const body = {
        email,
        password
    };

    return await api.post<ILoginResponse>('authentication/login', body);
}