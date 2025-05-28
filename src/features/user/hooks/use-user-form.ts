import { useFormik } from "formik";
import { FormMode } from "../../../enums/form.enum";
import GenderEnum from "../../../enums/gender.enum";
import RoleEnum from "../../../enums/role.enum";
import {
  createUserSchema,
  CreateUserSchema,
} from "../schema/create-user.schema";
import {
  updateUserSchema,
  UpdateUserSchema,
} from "../schema/update-user.schema";
import { useUserStore } from "../store/user.store";
import useCreateUser from "./use-create-user";
import useUpdateUser from "./use-update-user";

export default function useUserForm() {
  const { mode, value, close } = useUserStore();

  const initialValues: CreateUserSchema | UpdateUserSchema = {
    id: value?.id ?? undefined,
    email: value?.email ?? "",
    gender: value?.gender ?? GenderEnum.Male,
    role: value?.role ?? RoleEnum.STAFF,
    password: value?.password ?? "",
    name: value?.name ?? "",
  };

  const handleSuccessMutation = () => {
    close();
  };

  const createHook = useCreateUser(handleSuccessMutation);
  const updateHook = useUpdateUser(handleSuccessMutation);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      mode === FormMode.Create ? createUserSchema : updateUserSchema,
    onSubmit: (values, helper) => {
      if (mode === FormMode.Create) {
        createHook.mutate(values as CreateUserSchema);
      } else {
        updateHook.mutate({ ...values, id: value?.id ?? "" });
      }
      helper.resetForm();
    },
    enableReinitialize: true,
  });

  return {
    ...formik,
    isMutatiing: createHook.isPending || updateHook.isPending,
  };
}
