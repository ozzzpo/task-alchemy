import { useProjectStore } from '@/entities/Project/model/project.store';
import { Button } from '@/shared/ui/button';
import { DatePicker } from '@/shared/ui/datepicker';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
type FormData = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  completed: boolean;
  projectId: number;
};
export function AddTask() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();
  const { addTask } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [taskPriority, setTaskPriority] = useState<string>();
  const { currentProject } = useProjectStore();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(taskPriority);
    if (!taskPriority) {
      setError('priority', { message: 'Это поле обязательно' });
      return;
    }
    const startDate =
      data.startDate &&
      DateTime.fromJSDate(data.startDate).toFormat('yyyy-MM-dd');
    const endDate =
      data.endDate && DateTime.fromJSDate(data.endDate).toFormat('yyyy-MM-dd');
    addTask({
      ...data,
      startDate,
      endDate,
      projectId: currentProject!.id,
      priority: taskPriority,
    });
    setIsOpen(false);
    reset();
    setTaskPriority(undefined);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Добавить задачу</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[550px]">
        <DialogHeader>
          <DialogTitle>Добавление задачи</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-lg flex gap-5"
          id="add-task"
        >
          <div className="min-w-[47%] space-y-5">
            <div>
              <label htmlFor="title" className="pb-2">
                Имя задачи
              </label>
              <Input
                id="title"
                placeholder="Введите имя задачи..."
                {...register('title', { required: 'Это поле обязательно' })}
              />
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            </div>
            <div>
              <label htmlFor="title" className="text-lg pb-2">
                Описание задачи
              </label>
              <Textarea
                id="description"
                placeholder="Введите описание задачи..."
                {...register('description')}
              />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label htmlFor="startDate" className="text-lg">
                  Начало задачи
                </label>
                <DatePicker inputName="startDate" setValue={setValue} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="title" className="text-lg">
                  Конец задачи
                </label>
                <DatePicker inputName="endDate" setValue={setValue} />
              </div>
            </div>
            <div>
              <label htmlFor="priority" className="pb-2">
                Приоритет
              </label>
              <Select
                value={taskPriority}
                onValueChange={(value) => {
                  setTaskPriority(value);
                  clearErrors('priority');
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выберите приоритет..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="low">Низкий</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-red-500">{errors.priority?.message}</p>
            </div>
          </div>
        </form>
        <Button form="add-task">Добавить</Button>
      </DialogContent>
    </Dialog>
  );
}
