import { Task } from '@/shared/types/task.type';
import { PriorityTag } from '@/shared/ui/priority-tag';
import { SheetTitle } from '@/shared/ui/sheet';

export function TaskSheet({ data }: { data: Task }) {
  return (
    <div>
      <SheetTitle className="text-xl font-semibold">{data.title}</SheetTitle>
      <p>{data.description}</p>
      <div className="flex gap-2">
        Приоритет: <PriorityTag priority={data.priority} />
      </div>
      <div>
        Даты: {data?.startDate} - {data?.endDate}
      </div>
    </div>
  );
}
