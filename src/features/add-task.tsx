import { useKanbanStore } from '@/entities/Kanban/kanban.store';
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
import { useForm } from 'react-hook-form';

export function AddTask() {
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const { addTask } = useKanbanStore();
  const onSubmit = (data) => {
    addTask(
      {
        ...data,
        id: String(Math.random()),
        completed: false,
      },
      'column-1'
    );
    setIsOpen(false);
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
            <Input placeholder="Заголовок" {...register('content')} />
          </div>
          <Button>Добавить</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
