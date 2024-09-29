import { Project } from '@/shared/types/project.type';
import { Task } from '@/shared/types/task.type';
import { PriorityTag } from '@/shared/ui/priority-tag';
import { ColumnDef } from '@tanstack/react-table';
import { DateTime } from 'luxon';
export const getColumns = (projects: Project[]) => {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'title',
      header: 'Задача',
      cell: ({ row }) => {
        const title: string = row.getValue('title');
        return <p className="font-semibold text-neutral-600">{title}</p>;
      },
    },
    {
      accessorKey: 'description',
      header: 'Описание',
      cell: ({ row }) => {
        const description: string = row.getValue('description');
        return <p className="text-neutral-600">{description}</p>;
      },
    },

    {
      accessorKey: 'startDate',
      header: 'Даты',
      cell: ({ row }) => {
        const startDate: string = row.getValue('startDate');
        const endDate: string = row.getValue('endDate');
        return (
          <p className="text-neutral-600 min-w-36">
            {DateTime.fromISO(startDate).toFormat('dd.MM.yy')} -
            {DateTime.fromISO(endDate).toFormat('dd.MM.yy')}
          </p>
        );
      },
    },

    {
      accessorKey: 'priority',
      header: 'Приоритет',
      cell: ({ row }) => {
        const priority: string = row.getValue('priority');

        return <PriorityTag priority={priority} />;
      },
    },
    {
      accessorKey: 'projectId',
      header: 'Проект',
      cell: ({ row }) => {
        const projectId: number = row.getValue('projectId');
        const project = projects.find((project) => project.id === projectId);
        return <p className="text-neutral-600 font-medium">{project?.title}</p>;
      },
    },
    {
      accessorKey: 'endDate',
      header: '',
      cell: () => {
        return <div />;
      },
    },
  ];
  return columns;
};
