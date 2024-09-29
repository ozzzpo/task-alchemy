import { Employee } from './employee.type';

export type Task = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: string;
  completed: boolean;
  projectId: string;
  assignees?: Employee[] | null;
};
