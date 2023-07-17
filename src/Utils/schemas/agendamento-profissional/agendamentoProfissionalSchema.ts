import * as yup from "yup";
import { FieldRequested, MinCharName } from "@/Utils/Messages.string";
import { SelectProps } from "@/types/User";

export const registerProfessionalScheduleSchema = yup.object({
  professional: yup
    .object<any>()
    .shape({
      label: yup.string().required(FieldRequested),
      value: yup.string().required(FieldRequested),
    })
    .nullable()
    .required(FieldRequested),
  date: yup.string().min(3, MinCharName).required(FieldRequested),
  paid: yup.boolean().required(),
});
