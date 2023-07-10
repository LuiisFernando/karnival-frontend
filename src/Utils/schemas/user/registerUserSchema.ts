import * as yup from "yup";
import {
  FieldRequested,
  InvalidEmail,
  MinCharName,
} from "@/Utils/Messages.string";

export const userRegisterSchema = yup.object({
  name: yup.string().min(3, MinCharName).required(FieldRequested),
  email: yup.string().email(InvalidEmail).required(FieldRequested),
  roleProps: yup.object().shape({
    label: yup.string().required(FieldRequested),
    value: yup.string().required(FieldRequested),
  }).nullable().required(FieldRequested).typeError(FieldRequested),
});


export const userEditSchema = yup.object({
  id: yup.number().positive().required(),
  name: yup.string().min(3, MinCharName).required(FieldRequested),
  email: yup.string().email(InvalidEmail).required(FieldRequested),
  roleProps: yup.object().shape({
    label: yup.string().required(FieldRequested),
    value: yup.string().required(FieldRequested),
  }).nullable().required(FieldRequested).typeError(FieldRequested),
  active: yup.boolean().required()
});
