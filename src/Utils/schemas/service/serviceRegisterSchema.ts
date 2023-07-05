import * as yup from "yup";
import { FieldRequested, MinCharName } from "@/Utils/Messages.string";

export const serviceRegisterSchema = yup.object({
    name: yup.string().min(3, MinCharName).required(FieldRequested),
});
