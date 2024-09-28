import { Employee } from './employee.type';
import { Task } from './task.type';

export type Project = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  tasks: Task[];
  assignees: Employee[];
  columns: Column[];
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};
