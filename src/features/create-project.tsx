import { Button } from '@/shared/ui/button';
import { DatePicker } from '@/shared/ui/datepicker';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchEmployees } from './search-employees';
import { Employee } from '@/shared/types/employee.type';
import { DateTime } from 'luxon';
import { useProjectStore } from '@/entities/Project/model/project.store';
type FormData = {
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
};

export function CreateProject() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isOpen, setIsOpen] = useState(false);
  const { addProject } = useProjectStore();
  const [projectEmployees, setProjectEmployees] = useState<Employee[]>([]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const startDate =
      data.startDate &&
      DateTime.fromJSDate(data.startDate).toFormat('yyyy-MM-dd');
    const endDate =
      data.endDate && DateTime.fromJSDate(data.endDate).toFormat('yyyy-MM-dd');
    console.log({ ...data, startDate, endDate, assignees: projectEmployees });
    addProject({
      ...data,
      startDate,
      endDate,
      assignees: projectEmployees,
      tasks: [],
    });
    setIsOpen(false);
    reset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Создать проект</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Создание проекта</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-lg flex gap-5"
          id="create-project"
        >
          <div className="min-w-[47%] space-y-5">
            <div>
              <label htmlFor="title" className="pb-2">
                Имя проекта
              </label>
              <Input
                id="title"
                placeholder="Введите имя проекта..."
                {...register('title', { required: 'Это поле обязательно' })}
              />
              <p className="text-xs text-red-500">{errors.title?.message}</p>
            </div>
            <div>
              <label htmlFor="title" className="text-lg pb-2">
                Описание проекта
              </label>
              <Textarea
                id="description"
                placeholder="Введите описание проекта..."
                {...register('description')}
              />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label htmlFor="startDate" className="text-lg">
                  Начало проекта
                </label>
                <DatePicker inputName="startDate" setValue={setValue} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="title" className="text-lg">
                  Конец проекта
                </label>
                <DatePicker inputName="endDate" setValue={setValue} />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="role" className="text-lg pb-2">
                Сотрудники
              </label>
              {projectEmployees.map((employee, index) => (
                <p className="pb-2 font-medium" key={employee.id}>
                  {index + 1}. {employee.name}
                </p>
              ))}
            </div>
          </div>
          <div>
            <SearchEmployees
              projectEmployees={projectEmployees}
              setProjectEmployees={setProjectEmployees}
            />
          </div>
        </form>
        <Button type="submit" form="create-project">
          Создать
        </Button>
      </DialogContent>
    </Dialog>
  );
}
