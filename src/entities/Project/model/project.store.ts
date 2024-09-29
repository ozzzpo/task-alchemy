import { OnDragEndResponder } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Nullable } from '@/shared/types/common.type';
import { Project } from '@/shared/types/project.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/shared/types/task.type';

type ProjectStoreType = {
  projects: Project[];
  currentProject: Nullable<Project>;
  setCurrentProject: (projectId: string) => void;
  addProject: (project: Omit<Project, 'id' | 'columns'>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  handleDragEnd: OnDragEndResponder;
};

export const useProjectStore = create<ProjectStoreType>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      boardColumns: {},
      setCurrentProject: (projectId) =>
        set({
          currentProject: get().projects.find(
            (project) => project.id === projectId
          ),
        }),

      addTask: (task) => {
        const { currentProject } = get();
        if (!currentProject) return;

        // Создаем новую задачу с уникальным id
        const newTask = {
          ...task,
          id: uuidv4(),
        };

        // Находим колонку "Очередь задач" (предполагается, что она всегда есть, обычно первая колонка)
        const backlogColumnId = Object.keys(currentProject.columns)[0];
        console.log(currentProject.columns);
        const backlogColumn = currentProject.columns[backlogColumnId];

        if (!backlogColumn) return;

        // Добавляем id новой задачи в колонку "Очередь задач"
        const updatedTaskIds = [...backlogColumn.taskIds, newTask.id];

        // Обновляем колонку с новыми задачами
        const updatedColumn = {
          ...backlogColumn,
          taskIds: updatedTaskIds,
        };

        // Обновляем проект с новой задачей и обновленной колонкой
        set((state) => ({
          ...state,
          currentProject: {
            ...state.currentProject!,
            tasks: [...(state.currentProject?.tasks ?? []), newTask], // добавляем новую задачу в проект
            columns: {
              ...state.currentProject?.columns,
              [updatedColumn.id]: updatedColumn, // обновляем существующую колонку без её дублирования
            },
          },
        }));
      },

      addProject: (project) => {
        set((state) => ({
          projects: [
            ...state.projects,
            {
              ...project,
              id: uuidv4(),
              columns: {
                '1': {
                  id: '1',
                  title: 'Очередь задач',
                  taskIds: [],
                },
                '2': {
                  id: '2',
                  title: 'В работе',
                  taskIds: [],
                },
                '3': {
                  id: '3',
                  title: 'Тестируется',
                  taskIds: [],
                },
                '4': {
                  id: '4',
                  title: 'Готово',
                  taskIds: [],
                },
              },
            },
          ],
        }));
      },
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

          const { currentProject } = state;
          if (!currentProject) return state;

          // Получаем колонку источника и колонку назначения
          const startColumn = currentProject.columns[source.droppableId];
          const finishColumn = currentProject.columns[destination.droppableId];

          if (!startColumn || !finishColumn) return state;

          // Перемещение внутри одной и той же колонки
          if (startColumn === finishColumn) {
            const newTaskIds = Array.from(startColumn.taskIds);
            newTaskIds.splice(source.index, 1); // Удаляем из старого места
            newTaskIds.splice(destination.index, 0, draggableId); // Вставляем на новое

            const updatedColumn = {
              ...startColumn,
              taskIds: newTaskIds,
            };

            return {
              ...state,
              currentProject: {
                ...currentProject,
                columns: {
                  ...currentProject.columns,
                  [updatedColumn.id]: updatedColumn,
                },
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

          // Обновляем колонки
          return {
            ...state,
            currentProject: {
              ...currentProject,
              columns: {
                ...currentProject.columns,
                [newStartColumn.id]: newStartColumn,
                [newFinishColumn.id]: newFinishColumn,
              },
            },
          };
        }),
    }),
    {
      name: 'project-store',
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
      }),
    }
  )
);
