import * as yup from "yup";
import { updateUserSchema } from "./update-user.schema";

export const userSchema = updateUserSchema.shape({
    created_at: yup.date(),
    updated_at: yup.date(),
})

export type UserSchema = yup.InferType<typeof userSchema>;
