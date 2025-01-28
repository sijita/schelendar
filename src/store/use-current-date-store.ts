import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrentDateState {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const useCurrentDateStore = create<CurrentDateState>()(
  persist(
    (set) => ({
      currentDate: new Date(),
      setCurrentDate: (date: Date) => set({ currentDate: date }),
    }),
    {
      name: 'current-date-store',
      onRehydrateStorage: () => (state) => {
        if (state?.currentDate) {
          state.currentDate = new Date(state.currentDate); 
        }
      },
    }
  )
);
