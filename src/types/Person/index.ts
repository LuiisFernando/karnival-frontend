import { Maybe } from "yup";

export interface IPersonCreate {
    name: string;
    email: string;
    cellphone: Maybe<string | null>;
    provider: boolean;
    observation: Maybe<string | null>;
}

export interface IPerson {
    id: number;
    name: string;
    email: string;
    cellphone: Maybe<string | null>;
    active: boolean;
    observation: Maybe<string | null>;
}

export interface IPersonEdit {
    id: number;
    name: string;
    email: string;
    cellphone: Maybe<string | null>;
    active: boolean;
    observation: Maybe<string | null>;
}