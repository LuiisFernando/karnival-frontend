export interface ILoginResponse {
    user: IUser;
    token: string;
}

export enum Role {
    Administrador = 'Administrador',
    User = 'User'
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface IUserRegister {
    name: string;
    email: string;
    role: number;
}

export interface IUserDecoded {
    nameid: string;
    role: string;
    unique_name: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}