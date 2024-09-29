import { Employee } from '@/shared/types/employee.type';
import { DepartmentTag } from '@/shared/ui/department-tag';
import { ColumnDef } from '@tanstack/react-table';
import avatar from '@/shared/assets/images/avatar.png';
export const getColumns = () => {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'name',
      header: 'Сотрудник',
      cell: ({ row }) => {
        const name: string = row.getValue('name');
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 rounded-full overflow-hidden">
              <img src={avatar} alt="" />
            </div>
            <p className="font-semibold text-neutral-600">{name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: 'Номер телефона',
      cell: ({ row }) => {
        const phone: string = row.getValue('phone');
        return <p className="text-neutral-600">{phone}</p>;
      },
    },

    {
      accessorKey: 'department',
      header: 'Отдел',
      cell: ({ row }) => {
        const department: string = row.getValue('department');
        return <DepartmentTag department={department} />;
      },
    },
    {
      accessorKey: 'role',
      header: 'Должность',
      cell: ({ row }) => {
        const role: string = row.getValue('role');

        return <p className="text-neutral-600">{role}</p>;
      },
    },
  ];
  return columns;
};
