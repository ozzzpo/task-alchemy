import { Nullable } from '@/shared/types/common.type';
import { Project } from '@/shared/types/project.type';

export const getProjectColumns = (project: Nullable<Project>) => {
  const columns: Record<
    string,
    { id: string; title: string; taskIds: string[] }
  > = {};
  if (!project) return columns;
  project.columns.forEach((column) => {
    columns[column.id] = {
      id: column.id,
      title: column.title,
      taskIds: column.taskIds,
    };
  });
  return columns;
};
