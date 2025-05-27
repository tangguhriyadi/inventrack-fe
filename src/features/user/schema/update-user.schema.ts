import * as yup from "yup";
import GenderEnum from "../../../enums/gender.enum";
import RoleEnum from "../../../enums/role.enum";

export const updateUserSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().optional(),
  gender: yup
    .string()
    .oneOf(Object.values(GenderEnum))
    .required("Gender is required"),
  role: yup
    .string()
    .oneOf(Object.values(RoleEnum))
    .required("Role is required"),
});

export type UpdateUserSchema = yup.InferType<typeof updateUserSchema>;
