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
type FormData = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

const onSubmit: SubmitHandler<FormData> = (data) => {
  console.log(data);
};
export function CreateProject() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [isOpen, setIsOpen] = useState(false);
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
          className="text-lg flex"
          id="create-project"
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="pb-2">
                Имя проекта
              </label>
              <Input
                id="title"
                placeholder="Введите имя проекта..."
                {...register('title')}
              />
            </div>
            <div>
              <label htmlFor="title" className="text-lg pb-2">
                Описание проекта
              </label>
              <Textarea
                id="title"
                placeholder="Введите описание проекта..."
                {...register('title')}
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
          </div>
          <div>Employyes</div>
        </form>
        <Button type="submit" form="create-project">
          Создать
        </Button>
      </DialogContent>
    </Dialog>
  );
}
