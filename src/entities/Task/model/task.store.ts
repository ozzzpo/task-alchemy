import { Task } from '@/shared/types/task.type';
import { create } from 'zustand';

export type TaskStoreType = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export const useTaskStore = create<TaskStoreType>()((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
