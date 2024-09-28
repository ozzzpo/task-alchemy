import { useAppStore } from '@/entities/App/app.store';
import { useProjectStore } from '@/entities/Project/model/project.store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { KanbanBoard } from '@/widgets/kanban/kanban-board';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Project() {
  const { projectId } = useParams();
  const { setTitle } = useAppStore();
  const { currentProject } = useProjectStore();
  useEffect(() => {
    if (currentProject) {
      setTitle(currentProject?.title);
    }
  }, [currentProject, setTitle]);
  return (
    <Tabs defaultValue="kanban" className="h-full">
      <TabsList>
        <TabsTrigger value="kanban">Канбан</TabsTrigger>
        <TabsTrigger value="gantt">Гант</TabsTrigger>
      </TabsList>
      <TabsContent value="kanban" className="w-full min-h-full">
        <KanbanBoard />
      </TabsContent>
      <TabsContent value="gantt">Диаграмма Ганта</TabsContent>
    </Tabs>
  );
}
