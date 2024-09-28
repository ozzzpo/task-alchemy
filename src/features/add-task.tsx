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
  content: string;
};
export function AddTask() {
  const { register, handleSubmit } = useForm<FormData>();
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // addTask(
    //   {
    //     ...data,
    //     title: data.content,
    //     description: '',
    //     startDate: '',
    //     endDate: '',
    //     priority: 'low',
    //     id: String(Math.random()),
    //     completed: false,
    //     project: null,
    //   },
    //   'column-1'
    // );
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
