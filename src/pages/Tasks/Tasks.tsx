import { useAppStore } from '@/entities/App/app.store';
import { useProjectStore } from '@/entities/Project/model/project.store';
import { useTaskStore } from '@/entities/Task/model/task.store';
import { useEffect } from 'react';
import { DataTable } from '@/shared/ui/data-table';
import { getColumns } from './tableColumns';
import { TaskSheet } from '@/entities/Task/ui/task-sheet';

export function Tasks() {
  const { setTitle } = useAppStore();
  const { tasks, setTasks } = useTaskStore();
  const { projects } = useProjectStore();
  useEffect(() => {
    setTitle('Задачи');
    const allTasks = projects.map((project) => project.tasks).flat();
    setTasks(allTasks);
  }, [projects, setTitle, setTasks]);
  const columns = getColumns(projects);
  return (
    <div>
      <DataTable columns={columns} data={tasks} entitySheet={TaskSheet} />
    </div>
  );
}
