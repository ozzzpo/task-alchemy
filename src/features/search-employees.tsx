import { useEmployeeStore } from '@/entities/Employee/model/employee.store';
import { Employee } from '@/shared/types/employee.type';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

export const SearchEmployees = ({
  projectEmployees,
  setProjectEmployees,
}: {
  projectEmployees: Employee[];
  setProjectEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}) => {
  const { employees } = useEmployeeStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasBeenChosen = (employee: Employee) => {
    return projectEmployees.some(
      (projectEmployee) => projectEmployee.id === employee.id
    );
  };

  return (
    <div className="bg-[#F2F4F5]  px-5 overflow-scroll rounded-xl space-y-5 max-h-[400px] min-w-[50%]">
      <div className="sticky top-0 left-0 bg-[#F2F4F5] py-2">
        <h2 className="text-2xl font-medium mb-2 ">Все сотрудники</h2>
        <Input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col gap-2 bg-white p-4 mb-4 rounded-xl"
            >
              <h2 className="font-bold text-lg">{employee.name}</h2>
              <p>{employee.role}</p>
              {hasBeenChosen(employee) ? (
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-500"
                  onClick={() =>
                    setProjectEmployees((prev) =>
                      prev.filter((e) => e.id !== employee.id)
                    )
                  }
                >
                  Выбрано
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() =>
                    setProjectEmployees((prev) => [...prev, employee])
                  }
                >
                  Добавить в список
                </Button>
              )}
            </div>
          ))
        ) : (
          <p>Проектов не найдено</p>
        )}
      </div>
    </div>
  );
};
