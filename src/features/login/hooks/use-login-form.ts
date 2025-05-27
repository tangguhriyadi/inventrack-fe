"use client";

import { useFormik } from "formik";
import { loginSchema, LoginSchema } from "../schema/login.schema";
import { useLogin } from "./use-login";

const useLoginForm = () => {
  const login = useLogin();

  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  return useFormik<LoginSchema>({
    initialValues,
    onSubmit: async (values) => {
      await login.mutateAsync(values);
    },
    enableReinitialize: false,
    validationSchema: loginSchema,
    validateOnChange: true,
  });
};

export default useLoginForm;
