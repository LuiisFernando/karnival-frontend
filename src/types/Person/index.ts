export interface IPersonProfessionalCreate {
    name: string;
    email: string;
    cellphone: string;
    provider: boolean;
}

export interface IPerson {
    id: number;
    name: string;
    email: string;
    cellphone: string;
    provider: boolean;
}