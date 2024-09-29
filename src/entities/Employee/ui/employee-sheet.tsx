import { Employee } from '@/shared/types/employee.type';
import { SheetTitle } from '@/shared/ui/sheet';

export function EmployeeSheet({ data }: { data: Employee }) {
  return (
    <div>
      <SheetTitle className="text-xl font-semibold">{data.name}</SheetTitle>
    </div>
  );
}
