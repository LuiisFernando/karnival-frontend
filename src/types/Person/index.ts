import { Maybe } from "yup";

export interface IPersonCreate {
    name: string;
    email: string;
    cellphone: Maybe<string | null>;
    provider: boolean;
}

export interface IPerson {
    id: number;
    name: string;
    email: string;
    cellphone: Maybe<string | null>;
    provider: boolean;
}