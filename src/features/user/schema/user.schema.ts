import * as yup from "yup";
import { updateUserSchema } from "./update-user.schema";

export const userSchema = updateUserSchema;

export type UserSchema = yup.InferType<typeof userSchema>;
