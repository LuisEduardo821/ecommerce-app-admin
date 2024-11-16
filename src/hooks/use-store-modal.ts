import { create } from "zustand";

interface storeModalState {
  isOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export const useStoreModal = create<storeModalState>()((set) => ({
  isOpen: false,
  onOpenModal: () => set({ isOpen: true }),
  onCloseModal: () => set({ isOpen: false }),
}));
