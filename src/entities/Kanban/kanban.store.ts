import { Task } from '@/shared/types/task.type';
import { OnDragEndResponder } from 'react-beautiful-dnd';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type KanbanStoreType = {
  columns: Record<string, { id: string; title: string; taskIds: string[] }>;
  tasks: Record<string, Task>;
  handleDragEnd: OnDragEndResponder;
  setTasks: (tasks: Record<string, Task>) => void;
  addTask: (task: Task, columnId: string) => void;
};
// Zustand store
export const useKanbanStore = create<KanbanStoreType>()(
  persist(
    (set) => ({
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Очередь задач',
          taskIds: ['task-1', 'task-2'],
        },
        'column-2': {
          id: 'column-2',
          title: 'В работе',
          taskIds: ['task-3'],
        },
        'column-3': {
          id: 'column-3',
          title: 'Тестируется',
          taskIds: [],
        },
        'column-4': {
          id: 'column-4',
          title: 'Готово',
          taskIds: ['task-4'],
        },
      },
      tasks: {
        'task-1': { id: 'task-1', content: 'Разработать интерфейс' },
        'task-2': {
          id: 'task-2',
          content: 'Продумать интеграцию с почтовым клиентом',
        },
        'task-3': { id: 'task-3', content: 'Написать сервис клиентов' },
        'task-4': { id: 'task-4', content: 'Реализовать авторизацию' },
      },
      setTasks: (tasks) => set({ tasks }),
      addTask: (task, columnId) =>
        set((state) => {
          const column = state.columns[columnId];

          // Проверка: существует ли колонка
          if (!column) {
            console.error(`Колонка с id ${columnId} не существует.`);
            return state;
          }

          return {
            ...state,
            // Добавляем задачу в tasks
            tasks: {
              ...state.tasks,
              [task.id]: {
                id: task.id,
                content: task.content, // Убедимся, что контент задачи добавляется корректно
              },
            },
            // Обновляем колонку, добавляя задачу
            columns: {
              ...state.columns,
              [columnId]: {
                ...column,
                taskIds: [...column.taskIds, task.id], // Добавляем id новой задачи в массив taskIds
              },
            },
          };
        }),

      // Drag and Drop Handler
      handleDragEnd: (result) =>
        set((state) => {
          const { source, destination, draggableId } = result;

          // Если нет дроп-места, то ничего не делаем
          if (!destination) return state;

          // Если задача дропнута в то же самое место
          if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
          ) {
            return state;
          }

          // Получаем колонку источника и колонку назначения
          const startColumn = state.columns[source.droppableId];
          const finishColumn = state.columns[destination.droppableId];

          // Перемещение внутри одной и той же колонки
          if (startColumn === finishColumn) {
            const newTaskIds = Array.from(startColumn.taskIds);
            newTaskIds.splice(source.index, 1); // Удаляем из старого места
            newTaskIds.splice(destination.index, 0, draggableId); // Вставляем на новое

            const newColumn = {
              ...startColumn,
              taskIds: newTaskIds,
            };

            return {
              ...state,
              columns: {
                ...state.columns,
                [newColumn.id]: newColumn,
              },
            };
          }

          // Перемещение между разными колонками
          const startTaskIds = Array.from(startColumn.taskIds);
          startTaskIds.splice(source.index, 1);
          const newStartColumn = {
            ...startColumn,
            taskIds: startTaskIds,
          };

          const finishTaskIds = Array.from(finishColumn.taskIds);
          finishTaskIds.splice(destination.index, 0, draggableId);
          const newFinishColumn = {
            ...finishColumn,
            taskIds: finishTaskIds,
          };

          return {
            ...state,
            columns: {
              ...state.columns,
              [newStartColumn.id]: newStartColumn,
              [newFinishColumn.id]: newFinishColumn,
            },
          };
        }),
    }),
    {
      name: 'kanban-store',
      partialize: (state) => ({ columns: state.columns, tasks: state.tasks }),
    }
  )
);
