import { useAppStore } from '@/entities/App/app.store';
import { useEffect } from 'react';
import { Input } from '@/shared/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { FilterIcon } from 'lucide-react';
import { EmployeeCard } from '@/entities/Employee/ui/employee-card';


const employeeDetails = [
  { id: 1, value: 'Сотрудник' },
  { id: 2, value: 'Номер телефона' },
  { id: 3, value: 'Отдел' },
  { id: 4, value: 'Должность' },
];
export function Employees() {
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Сотрудники');
  }, [setTitle]);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between ">
        <div className="flex gap-5">
          <Input placeholder="Поиск" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex align-middle gap-2 border border-slate-300 rounded-sm py-1.5 px-6">
                <FilterIcon />
                <span>Фильтр</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Время</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Button className="bg-blue-500">Добавить сотрудника</Button>
        </div>
      </div>
      <div className='flex flex-col gap-[15px]'>
      <div className="w-full bg-neutral-100 py-2 px-5 rounded-[8px]">
        <div className="flex w-[72%] justify-between">
          {employeeDetails.map((detail) => (
            <span key={detail.id}>{detail.value}</span>
          ))}
        </div> 
      </div>
      <div className='flex flex-col gap-[15px]'>
        <EmployeeCard/>
        <EmployeeCard/>
      </div>
      </div>
    </div>
  );
}
