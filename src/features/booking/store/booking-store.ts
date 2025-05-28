import { create } from "zustand";

type UserStoreValue = {
  isOpen: boolean;
  isOpenReturn: boolean;
  close: () => void;
  open: () => void;
  openReturn: () => void;
  closeReturn: () => void;
};

export const useBookingStore = create<UserStoreValue>((set) => ({
  isOpen: false,
  isOpenReturn: false,
  close: () => set(() => ({ isOpen: false })),
  open: () => set(() => ({ isOpen: true })),
  closeReturn: () => set(() => ({ isOpenReturn: false })),
  openReturn: () => set(() => ({ isOpenReturn: true })),
}));
