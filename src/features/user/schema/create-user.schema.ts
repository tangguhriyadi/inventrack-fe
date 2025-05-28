import * as yup from "yup";
import GenderEnum from "../../../enums/gender.enum";
import RoleEnum from "../../../enums/role.enum";

export const createUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  gender: yup
    .string()
    .oneOf(Object.values(GenderEnum))
    .required("Gender is required"),
  role: yup
    .string()
    .oneOf(Object.values(RoleEnum))
    .required("Role is required"),
  password: yup
    .string()
    .min(
      8,
      "Min 8 characters consisting of uppercase, lowercase, numbers, symbols.",
    )
    .max(
      150,
      "Min 8 characters consisting of uppercase, lowercase, numbers, symbols.",
    )
    .matches(
      /[a-z]/,
      "Min 8 characters consisting of uppercase, lowercase, numbers, symbols.",
    )
    .matches(
      /[A-Z]/,
      "Min 8 characters consisting of uppercase, lowercase, numbers, symbols.",
    )
    .matches(
      /[0-9]/,
      "Min 8 characters consisting of uppercase, lowercase, numbers, symbols.",
    )
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must be at least 8 characters consisting of uppercase, lowercase, numbers, symbols.",
    )
    .required("Password is required"),
});

export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
