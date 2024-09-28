import { Task } from '@/shared/types/task.type';

export const getBoardTasks = (tasks: Task[] | undefined) => {
  if (!tasks) return {};
  const boardTasks: Record<string, Task> = {};
  tasks.forEach((task) => {
    boardTasks[task.id] = task;
  });
  return boardTasks;
};
