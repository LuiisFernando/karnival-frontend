import * as yup from "yup";
import { FieldRequested, InvalidEmail } from "@/Utils/ErrorMessage.string";

export const loginSchema = yup.object({
    email: yup.string().email(InvalidEmail).required(FieldRequested),
    password: yup.string().required(FieldRequested),
});