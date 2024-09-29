import { Task } from '@/shared/types/task.type';
import { SheetTitle } from '@/shared/ui/sheet';

export function TaskSheet({ data }: { data: Task }) {
  return (
    <div>
      <SheetTitle className="text-xl font-semibold">{data.title}</SheetTitle>
    </div>
  );
}
