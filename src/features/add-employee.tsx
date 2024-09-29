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
import { SearchProjects } from './search-projects';
import { Project } from '@/shared/types/project.type';
import { useEmployeeStore } from '@/entities/Employee/model/employee.store';
type FormData = {
  name: string;
  phone: string;
  department: string;
  role: string;
};

export function AddEmployee() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isOpen, setIsOpen] = useState(false);
  const { addEmployee } = useEmployeeStore();
  const [employeeProjects, setEmployeeProjects] = useState<Project[]>([]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const projectIds = employeeProjects.map((project) => project.id);
    addEmployee({ ...data, projectIds });
    setIsOpen(false);
    reset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Добавить сотрудника</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Добавление сотрудника</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-lg flex gap-5"
          id="create-project"
        >
          <div className="min-w-[47%] space-y-5">
            <div>
              <label htmlFor="name" className="pb-2">
                ФИО сотрудника
              </label>
              <Input
                id="name"
                placeholder="Введите ФИО..."
                {...register('name', { required: 'Это поле обязательно' })}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="text-lg pb-2">
                Номер телефона
              </label>
              <Input
                id="phone"
                placeholder="Введите телефон..."
                {...register('phone', {
                  required: 'Это поле обязательно',
                  pattern: /^((8|\+7)[ ]?)?(\(?\d{3}\)?[ ]?)?[\d\- ]{7,10}$/,
                })}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="department" className="text-lg pb-2">
                Отдел
              </label>
              <Input
                id="department"
                placeholder="Введите отдел..."
                {...register('department', {
                  required: 'Это поле обязательно',
                })}
              />
              {errors.department && (
                <p className="text-xs text-red-500">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="role" className="text-lg pb-2">
                Должность
              </label>
              <Input
                id="role"
                placeholder="Введите должность..."
                {...register('role', { required: 'Это поле обязательно' })}
              />
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="role" className="text-lg pb-2">
                Проекты
              </label>
              {employeeProjects.map((project, index) => (
                <p className="pb-2 font-medium" key={project.id}>
                  {index + 1}. {project.title}
                </p>
              ))}
            </div>
          </div>
          <SearchProjects
            employeeProjects={employeeProjects}
            setEmployeeProjects={setEmployeeProjects}
          />
        </form>
        <Button type="submit" form="create-project">
          Создать
        </Button>
      </DialogContent>
    </Dialog>
  );
}
