import * as yup from "yup";

export const createInventorySchema = yup.object({
  name: yup.string().required("Name is required"),
  quantity: yup.number().required().min(1),
  category_id: yup.string().required("Category is required"),
  is_available: yup.boolean().required().default(true),
  image_url: yup.string().required("Image is required"),
});

export type CreateInventorySchema = yup.InferType<typeof createInventorySchema>;
