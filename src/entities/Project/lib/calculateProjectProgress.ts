import { Project } from '@/shared/types/project.type';

export const calculateProjectProgress = (project: Project) => {
  const tasks = project.tasks;
  let completedTasks = 0;
  tasks.forEach((task) => {
    if (task.completed) {
      completedTasks++;
    }
  });
  return Math.round((completedTasks / tasks.length) * 100);
};
