import { useFormik } from "formik";
import { FormMode } from "../../../enums/form.enum";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "../schema/create-category.schema";
import {
  updateCategorySchema,
  UpdateCategorySchema,
} from "../schema/update-category.schema";
import useCreateCategory from "./use-create-category";
import useUpdateCategory from "./use-update-category";
import { useCategoryStore } from "../store/category.store";

export default function useCategoryForm() {
  const { mode, value, close } = useCategoryStore();

  const initialValues: CreateCategorySchema | UpdateCategorySchema = {
    id: value?.id ?? undefined,
    name: value?.name ?? "",
  };

  const handleSuccessMutation = () => {
    close();
  };

  const createHook = useCreateCategory(handleSuccessMutation);
  const updateHook = useUpdateCategory(handleSuccessMutation);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      mode === FormMode.Create ? createCategorySchema : updateCategorySchema,
    onSubmit: async (values, helper) => {
      if (mode === FormMode.Create) {
        await createHook
          .mutateAsync(values as CreateCategorySchema)
          .then(() => {
            helper.resetForm();
          });
      } else {
        await updateHook
          .mutateAsync({ ...values, id: value?.id ?? "" })
          .then(() => {
            helper.resetForm();
          });
      }
    },
    enableReinitialize: true,
  });

  return {
    ...formik,
    isMutating: createHook.isPending || updateHook.isPending,
  };
}
