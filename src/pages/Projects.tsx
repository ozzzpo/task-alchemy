import { useAppStore } from '@/entities/App/app.store';
import { useProjectStore } from '@/entities/Project/model/project.store';
import { ProjectCard } from '@/entities/Project/ui/project-card';
import { Input } from '@/shared/ui/input';
import { useEffect } from 'react';

export function Projects() {
  const { projects } = useProjectStore();
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Проекты');
  }, [setTitle]);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input placeholder="Поиск" />
      </div>
      <div className="flex gap-4 flex-wrap">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
