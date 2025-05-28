import * as yup from "yup";
import { createCategorySchema } from "./create-category.schema";

export const updateCategorySchema = createCategorySchema.shape({
  id: yup.string().required(),
});

export type UpdateCategorySchema = yup.InferType<typeof updateCategorySchema>;
