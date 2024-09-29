import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/shared/types/task.type';
import { Checkbox } from '@/shared/ui/checkbox';
import { PriorityTag } from '@/shared/ui/priority-tag';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { TaskSheet } from './task-sheet';

export function DraggableTaskCard({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  return (
    <Sheet>
      <Draggable draggableId={task?.id} index={index}>
        {(provided) => (
          <SheetTrigger asChild>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`flex gap-2 bg-white p-2 mb-2 rounded-md shadow-md cursor-pointer ${
                task.completed ? 'opacity-45 hover:opacity-100 transition' : ''
              }`}
            >
              <Checkbox
                className="mt-1"
                checked={task.completed}
                onClick={(e) => e.stopPropagation()}
              />
              <div>
                <p>{task.title}</p>
                <PriorityTag priority={task.priority} />
              </div>
            </div>
          </SheetTrigger>
        )}
      </Draggable>
      <SheetContent>
        <TaskSheet data={task} />
      </SheetContent>
    </Sheet>
  );
}
