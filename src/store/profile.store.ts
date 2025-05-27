"use client";
import { create } from "zustand";
import { ProfileSchema } from "../features/profile/schema/profile-form.schema";

type AppTourStoreValue = {
  value?: ProfileSchema;
  setValue: (value: ProfileSchema) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
};

const useProfileStore = create<AppTourStoreValue>((set) => ({
  value: undefined,
  setValue: (value) => set(() => ({ value })),
  isLoading: false,
  setIsLoading: (val) => set(() => ({ isLoading: val })),
}));

export default useProfileStore;
