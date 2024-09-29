import { useAppStore } from '@/entities/App/app.store';
import { useProjectStore } from '@/entities/Project/model/project.store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import GanttChart from '@/widgets/gantt/gantt-chart';
import { KanbanBoard } from '@/widgets/kanban/kanban-board';
import { useEffect } from 'react';

export function Project() {
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
        <TabsTrigger value="kanban">Канбан-доска</TabsTrigger>
        <TabsTrigger value="gantt">Диаграмма Ганта</TabsTrigger>
        <TabsTrigger value="employees">Сотрудники</TabsTrigger>
      </TabsList>
      <TabsContent value="kanban" className="w-full px-2">
        <KanbanBoard />
      </TabsContent>
      <TabsContent value="gantt" className="w-full px-2">
        <GanttChart tasks={currentProject?.tasks ?? []} />
      </TabsContent>
      <TabsContent value="employees" className="w-full px-2">
        <p>employees</p>
      </TabsContent>
    </Tabs>
  );
}
