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
      "Password must be at least 8 characters consisting of uppercase letters, lowercase letters, numbers, and symbols.",
    )
    .max(
      150,
      "Password must be at least 8 characters consisting of uppercase letters, lowercase letters, numbers, and symbols.",
    )
    .matches(
      /[a-z]/,
      "Password must be at least 8 characters consisting of uppercase letters, lowercase letters, numbers, and symbols.",
    )
    .matches(
      /[A-Z]/,
      "Password must be at least 8 characters consisting of uppercase letters, lowercase letters, numbers, and symbols.",
    )
    .matches(
      /[0-9]/,
      "Password must be at least 8 characters consisting of uppercase letters, lowercase letters, numbers, and symbols.",
    )
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must be at least 8 characters consisting of uppercase letters, lowercase letters, numbers, and symbols.",
    )
    .required("Password is required"),
});

export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
