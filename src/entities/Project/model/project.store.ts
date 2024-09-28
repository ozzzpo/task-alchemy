import { Nullable } from '@/shared/types/common.type';
import { Project } from '@/shared/types/project.type';
import { create } from 'zustand';
import { projects } from './projects';
import { persist } from 'zustand/middleware';
import { getProjectColumns } from '../lib/getProjectColumns';
import { OnDragEndResponder } from 'react-beautiful-dnd';

type ProjectStoreType = {
  projects: Project[];
  currentProject: Nullable<Project>;
  boardColumns: Record<
    string,
    { id: string; title: string; taskIds: string[] }
  >;
  setCurrentProject: (projectId: number) => void;
  setColumns: (project: Project) => void;
  handleDragEnd: OnDragEndResponder;
};

export const useProjectStore = create<ProjectStoreType>()(
  persist(
    (set, get) => ({
      projects,
      currentProject: null,
      boardColumns: {},
      setCurrentProject: (projectId: number) =>
        set({
          currentProject: get().projects.find(
            (project) => project.id === projectId
          ),
        }),
      setColumns: () => {
        if (!get().currentProject) return {};
        const columns = getProjectColumns(get().currentProject);
        set({ boardColumns: columns });
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

          // Получаем колонку источника и колонку назначения
          const startColumn = state.boardColumns[source.droppableId];
          const finishColumn = state.boardColumns[destination.droppableId];

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
              boardColumns: {
                ...state.boardColumns,
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
            boardColumns: {
              ...state.boardColumns,
              [newStartColumn.id]: newStartColumn,
              [newFinishColumn.id]: newFinishColumn,
            },
          };
        }),
    }),
    {
      name: 'project-store',
      partialize: (state) => ({
        currentProject: state.currentProject,
        boardColumns: state.boardColumns,
      }),
    }
  )
);
