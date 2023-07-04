import * as yup from "yup";
import { FieldRequested, InvalidEmail, MinCharName, SelectInvalidOption } from "@/Utils/ErrorMessage.string";

export const userRegisterSchema = yup.object({
    name: yup.string().min(3, MinCharName).required(FieldRequested),
    email: yup.string().email(InvalidEmail).required(FieldRequested),
    role: yup.number().required().positive().integer().typeError(SelectInvalidOption)
});
