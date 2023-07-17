import { Maybe } from "yup";

interface SelectProps {
    value: string;
    label: string;
}

export interface ProfessionalSchedule {
    professional: Maybe<SelectProps | null>;
    date: string;
    paid: boolean;
}