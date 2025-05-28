import { create } from "zustand";

type UserStoreValue = {
  value?: string;
  close: () => void;
  open: (value?: string) => void;
};

export const useApprovalStore = create<UserStoreValue>((set) => ({
  value: undefined,
  close: () => set(() => ({ value: undefined })),
  open: (value?: string) => set(() => ({ value })),
}));
