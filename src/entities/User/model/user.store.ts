import { Nullable } from '@/shared/types/common.type';
import { User } from '@/shared/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: Nullable<User>;
  isAuth: boolean;
  login: (data: any) => void;
  register: (data: any) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuth: true,
      login: (data) => set({ user: data, isAuth: true }),
      register: (data) => set({ user: data, isAuth: true }),
      logout: () => set({ user: null, isAuth: false }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user, isAuth: state.isAuth }),
    }
  )
);
