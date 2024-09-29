import { useProjectStore } from '@/entities/Project/model/project.store';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
type FormData = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: string;
  completed: boolean;
  projectId: number;
};
export function AddTask() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { addTask } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    addTask(data);
    setIsOpen(false);
    reset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Добавить задачу</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление задачи</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="content" className="pb-2">
              Заголовок задачи
            </label>
            <Input placeholder="Заголовок" {...register('title')} />
          </div>
          <Button>Добавить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
