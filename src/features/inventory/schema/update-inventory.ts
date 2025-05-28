import * as yup from "yup";
import { createInventorySchema } from "./create-inventory";

export const updateInventorySchema = createInventorySchema.shape({
  id: yup.string().required(),
});

export type UpdateInventorySchema = yup.InferType<typeof updateInventorySchema>;
