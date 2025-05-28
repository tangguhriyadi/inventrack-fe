import { create } from "zustand";
import { FormMode } from "@/enums/form.enum";
import { InventorySchema } from "../schema/inventory.schema";

type UserStoreValue = {
  value?: InventorySchema;
  mode?: FormMode;
  close: () => void;
  open: (mode: FormMode, value?: InventorySchema) => void;
};

export const useInventoryStore = create<UserStoreValue>((set) => ({
  value: undefined,
  mode: undefined,
  close: () => set(() => ({ mode: undefined, value: undefined })),
  open: (mode: FormMode, value?: InventorySchema) =>
    set(() => ({ value, mode })),
}));
