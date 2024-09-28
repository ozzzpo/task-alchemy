import { Employee } from './employee.type';
import { Task } from './task.type';

export type Project = {
  id: number;
  name: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  tasks: Task[];
  assignees: Employee[];
};
