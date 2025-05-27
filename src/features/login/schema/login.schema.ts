import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),

  password: yup.string().required("Password is required"),
  // password: yup.string().when("identifier", {
  //   is: (email: string) => email && isEmail(email),
  //   then: (schema) => schema.required("Mohon isi password kamu!"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;
