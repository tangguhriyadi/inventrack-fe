import * as yup from "yup";
import { createCategorySchema } from "./create-category.schema";

export const categorySchema = createCategorySchema.shape({
  id: yup.string().required(),
  created_at: yup.date(),
  updated_at: yup.date(),
  createdBy: yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
  }),
});

export type CategorySchema = yup.InferType<typeof categorySchema>;
