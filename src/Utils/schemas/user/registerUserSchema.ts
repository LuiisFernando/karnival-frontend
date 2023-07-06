import * as yup from "yup";
import {
  FieldRequested,
  InvalidEmail,
  MinCharName,
  SelectInvalidOption,
} from "@/Utils/Messages.string";

export const userRegisterSchema = yup.object({
  name: yup.string().min(3, MinCharName).required(FieldRequested),
  email: yup.string().email(InvalidEmail).required(FieldRequested),
  role: yup.object().shape({
    label: yup.string().required(FieldRequested),
    value: yup.string().required(FieldRequested),
  }).nullable().required(FieldRequested).typeError(FieldRequested),
});
