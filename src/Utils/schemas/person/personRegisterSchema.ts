import * as yup from "yup";
import { FieldRequested, InvalidEmail, MinCharName } from "@/Utils/ErrorMessage.string";

export const personRegisterSchema = yup.object({
    name: yup.string().min(3, MinCharName).required(FieldRequested),
    email: yup.string().email(InvalidEmail).required(FieldRequested),
    cellphone: yup.string().nullable(),
    provider: yup.boolean().default(false)
});
