import { Nullable } from '@/shared/types/common.type';
import { User } from '@/shared/types/user.type';
import { create } from 'zustand';

type UserStore = {
  user: Nullable<User>;
  isAuth: boolean;
  login: (data: any) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  isAuth: true,
  login: (data) => set({ user: data, isAuth: true }),
}));
