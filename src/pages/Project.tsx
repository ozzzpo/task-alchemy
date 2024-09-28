import { useAppStore } from '@/entities/App/app.store';
import { useProjectStore } from '@/entities/Project/model/project.store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { KanbanBoard } from '@/widgets/kanban/kanban-board';
import { useEffect } from 'react';

export function Project() {
  const { setTitle } = useAppStore();
  const { currentProject, setColumns } = useProjectStore();
  useEffect(() => {
    if (currentProject) {
      setTitle(currentProject?.title);
      setColumns(currentProject);
    }
  }, [currentProject, setTitle, setColumns]);
  return (
    <Tabs defaultValue="kanban" className="h-full">
      <TabsList>
        <TabsTrigger value="kanban">Канбан</TabsTrigger>
        <TabsTrigger value="gantt">Гант</TabsTrigger>
      </TabsList>
      <TabsContent value="kanban" className="w-full px-2">
        <KanbanBoard />
      </TabsContent>
      <TabsContent value="gantt">Диаграмма Ганта</TabsContent>
    </Tabs>
  );
}
