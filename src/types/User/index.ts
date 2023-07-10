export interface SelectProps {
    value: string;
    label: string;
}


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
    roleDescription: string;
    active: boolean;
}

export interface IUserCreateRequest {
    name: string;
    email: string;
    role: number;
}

export interface IUserEditRequest extends IUserCreateRequest {
    id: number;
}

export interface IUserCreate {
    name: string;
    email: string;
    role: SelectProps;
}

export interface IUserEdit {
    id: number;
    name: string;
    email: string;
    active: boolean;
    role: SelectProps;
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