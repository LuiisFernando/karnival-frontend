export interface ILoginResponse {
    user: IUser;
    token: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface IUserDecoded {
    nameid: string;
    role: string;
    unique_name: string;
}