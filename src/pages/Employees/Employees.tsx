import { useAppStore } from '@/entities/App/app.store';
import { useEffect, useState } from 'react';
import { Input } from '@/shared/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { FilterIcon } from 'lucide-react';
import { DataTable } from '@/shared/ui/data-table';
import { getColumns } from './tableColumns';
import { useEmployeeStore } from '@/entities/Employee/model/employee.store';
import { EmployeeSheet } from '@/entities/Employee/ui/employee-sheet';
import { AddEmployee } from '@/features/add-employee';

export function Employees() {
  const { setTitle } = useAppStore();
  const { employees } = useEmployeeStore();
  useEffect(() => {
    setTitle('Сотрудники');
  }, [setTitle]);
  const [query, setQuery] = useState<string>('');
  const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(query.toLowerCase());
  });
  const columns = getColumns();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between ">
        <div className="flex gap-5">
          <Input
            placeholder="Поиск"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
          <AddEmployee />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredEmployees}
        entitySheet={EmployeeSheet}
      />
    </div>
  );
}
