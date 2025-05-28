import * as yup from "yup"

export const createCategorySchema = yup.object({
    name: yup.string().required("Name is required")
})

export type CreateCategorySchema = yup.InferType<typeof createCategorySchema>