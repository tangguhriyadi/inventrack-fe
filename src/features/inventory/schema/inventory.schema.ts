import * as yup from "yup";
import { createInventorySchema } from "./create-inventory";

export const inventorySchema = createInventorySchema.shape({
  id: yup.string().required(),
  created_at: yup.date(),
  updated_at: yup.date(),
  createdBy: yup.object({
    id: yup.string(),
    name: yup.string(),
  }),
  inventoryCategory: yup.object({
    name: yup.string(),
  }),
});

export type InventorySchema = yup.InferType<typeof inventorySchema>;
