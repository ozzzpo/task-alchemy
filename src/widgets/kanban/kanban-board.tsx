import { useProjectStore } from '@/entities/Project/model/project.store';
import { AddTask } from '@/features/add-task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoardTasks } from './lib/getBoardTasks';
import { DraggableTaskCard } from '@/entities/Task/ui/draggable-task-card';

export function KanbanBoard() {
  const { currentProject, handleDragEnd } = useProjectStore();
  const tasks = getBoardTasks(currentProject?.tasks);
  return (
    <div className="min-h-[600px] min-w-full overflow-hidden bg-black rounded-md p-5">
      {' '}
      {/* wrapper */}
      <AddTask />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 py-4 min-h-[600px] overflow-x-scroll">
          {Object.entries(currentProject!.columns).map(([columnId, column]) => (
            <div
              className=" flex flex-col min-w-64 max-w-64  bg-gray-200 p-4 rounded-md"
              key={columnId}
            >
              <h2 className="text-lg font-semibold mb-3">{column.title}</h2>
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1"
                  >
                    {column.taskIds.map((taskId, index) => {
                      const task = tasks[taskId] ?? {};
                      return (
                        <DraggableTaskCard
                          task={task}
                          index={index}
                          key={taskId}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
