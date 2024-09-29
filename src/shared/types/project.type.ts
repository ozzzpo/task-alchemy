import { Employee } from './employee.type';
import { Task } from './task.type';

export type Project = {
  id: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  tasks: Task[];
  assignees: Employee[];
  columns: Record<string, Column>;
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};
