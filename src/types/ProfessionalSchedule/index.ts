import { Maybe } from "yup";
import { SelectProps } from "../SelectProps";

export interface ICreateProfessionalSchedule {
    professional: Maybe<SelectProps | null>;
    service: Maybe<SelectProps | null>;
    date: Date;
    paid: boolean;
}

export interface ICreateProfessionalScheduleRequest {
    professionalId: number;
    serviceId: number;
    date: string;
    paid: boolean;
}

export interface IProfessionalScheduleResponse {
    id: number;
    professionalName: string;
    serviceName: string;
    date: string;
    paid: boolean;
    initialHour: string;
    finalHour: string;
}