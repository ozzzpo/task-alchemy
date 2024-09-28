import { Nullable } from '@/shared/types/common.type';
import { Project } from '@/shared/types/project.type';
import { create } from 'zustand';
import { projects } from './projects';
import { persist } from 'zustand/middleware';

type ProjectStoreType = {
  projects: Project[];
  currentProject: Nullable<Project>;
  setCurrentProject: (projectId: number) => void;
};

export const useProjectStore = create<ProjectStoreType>()(
  persist(
    (set, get) => ({
      projects,
      currentProject: null,
      setCurrentProject: (projectId: number) =>
        set({
          currentProject: get().projects.find(
            (project) => project.id === projectId
          ),
        }),
    }),
    {
      name: 'project-store',
      partialize: (state) => ({ currentProject: state.currentProject }),
    }
  )
);
