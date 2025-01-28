import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ModalType = 'editModal' | 'addModal' | 'deleteModal';

interface ModalState {
  openModals: Record<ModalType, boolean>;
  setIsOpenModal: (modalName: ModalType) => void;
  setIsClosedModal: (modalName: ModalType) => void;
  closeAllModals: () => void;
}

export const useModalHandlingStore = create<ModalState>()(
  persist(
    (set) => ({
      openModals: {
        editModal: false,
        addModal: false,
        deleteModal: false,
      },
      setIsOpenModal: (modalName) =>
        set((state) => ({
          openModals: {
            ...state.openModals,
            [modalName]: true,
          },
        })),
      setIsClosedModal: (modalName) =>
        set((state) => ({
          openModals: {
            ...state.openModals,
            [modalName]: false,
          },
        })),
      closeAllModals: () =>
        set({
          openModals: {
            editModal: false,
            addModal: false,
            deleteModal: false,
          },
        }),
    }),
    {
      name: 'modal-storage',
    }
  )
);
