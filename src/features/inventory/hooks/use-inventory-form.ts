import { useFormik } from "formik";
import { FormMode } from "../../../enums/form.enum";
import { useInventoryStore } from "../store/inventory-store";
import {
  CreateInventorySchema,
  createInventorySchema,
} from "../schema/create-inventory";
import {
  UpdateInventorySchema,
  updateInventorySchema,
} from "../schema/update-inventory";
import useCreateInventory from "./use-create-inventory";
import useUpdateInventory from "./use-update-inventory";

export default function useInventoryForm() {
  const { mode, value, close } = useInventoryStore();

  const initialValues: CreateInventorySchema | UpdateInventorySchema = {
    id: value?.id ?? undefined,
    name: value?.name ?? "",
    category_id: value?.category_id ?? "",
    quantity: value?.quantity ?? 0,
    image_url: value?.image_url ?? "",
    is_available: value?.is_available ?? true,
  };

  const handleSuccessMutation = () => {
    close();
  };

  const createHook = useCreateInventory(handleSuccessMutation);
  const updateHook = useUpdateInventory(handleSuccessMutation);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      mode === FormMode.Create ? createInventorySchema : updateInventorySchema,
    onSubmit: (values, helper) => {
      if (mode === FormMode.Create) {
        createHook.mutate(values as CreateInventorySchema);
      } else {
        updateHook.mutate({ ...values, id: value?.id ?? "" });
      }
      helper.resetForm();
    },
    enableReinitialize: true,
  });

  return {
    ...formik,
    isMutating: createHook.isPending || updateHook.isPending,
  };
}
