import { Task } from '@/shared/types/task.type';
import { Checkbox } from '@/shared/ui/checkbox';
import { PriorityTag } from '@/shared/ui/priority-tag';
import { Draggable } from 'react-beautiful-dnd';

export function DraggableTaskCard({
  task,
  index,
}: {
  task: Task;
  index: number;
}) {
  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex gap-2 bg-white p-2 mb-2 rounded-md shadow-md ${
            task.completed ? 'opacity-45 hover:opacity-100 transition' : ''
          }`}
        >
          <Checkbox className="mt-1" checked={task.completed} />
          <div>
            <p>{task.title}</p>
            <PriorityTag priority={task.priority} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
