import { create } from "zustand";
import { FormMode } from "@/enums/form.enum";
import { UserSchema } from "../schema/user.schema";

type UserStoreValue = {
  value?: UserSchema;
  mode?: FormMode;
  close: () => void;
  open: (mode: FormMode, value?: UserSchema) => void;
};

export const useUserStore = create<UserStoreValue>((set) => ({
  value: undefined,
  mode: undefined,
  close: () => set(() => ({ mode: undefined, value: undefined })),
  open: (mode: FormMode, value?: UserSchema) => set(() => ({ value, mode })),
}));
