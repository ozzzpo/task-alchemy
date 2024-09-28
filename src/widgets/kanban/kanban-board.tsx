import { useKanbanStore } from '@/entities/Kanban/kanban.store';
import { useProjectStore } from '@/entities/Project/model/project.store';
import { AddTask } from '@/features/add-task';
import { Button } from '@/shared/ui/button';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export function KanbanBoard() {
  const { currentProject } = useProjectStore();
  const { columns, tasks, handleDragEnd } = useKanbanStore();
  return (
    <div className="min-h-[600px] min-w-full overflow-hidden bg-black p-5">
      {' '}
      {/* wrapper */}
      <AddTask />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 p-4 min-h-[600px]">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-64  bg-gray-200 p-4 rounded-md"
                >
                  <h2 className="text-lg font-semibold mb-3">{column.title}</h2>
                  {column.taskIds.map((taskId, index) => {
                    const task = tasks[taskId];
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded-md shadow-md"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
