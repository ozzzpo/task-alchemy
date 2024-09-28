import { create } from 'zustand';

type AppStoreType = {
  title: string;
  setTitle: (title: string) => void;
};

export const useAppStore = create<AppStoreType>()((set) => ({
  title: '',
  setTitle: (title: string) => set(() => ({ title })),
}));
