import { create } from "zustand";
import { FormMode } from "@/enums/form.enum";
import { CategorySchema } from "../schema/category.schema";

type UserStoreValue = {
  value?: CategorySchema;
  mode?: FormMode;
  close: () => void;
  open: (mode: FormMode, value?: CategorySchema) => void;
};

export const useCategoryStore = create<UserStoreValue>((set) => ({
  value: undefined,
  mode: undefined,
  close: () => set(() => ({ mode: undefined, value: undefined })),
  open: (mode: FormMode, value?: CategorySchema) =>
    set(() => ({ value, mode })),
}));
