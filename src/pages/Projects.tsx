import { useAppStore } from '@/entities/App/app.store';
import { useProjectStore } from '@/entities/Project/model/project.store';
import { ProjectCard } from '@/entities/Project/ui/project-card';
import { CreateProject } from '@/features/create-project';

import { Input } from '@/shared/ui/input';
import { useEffect, useState } from 'react';

export function Projects() {
  const { projects } = useProjectStore();
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Проекты');
  }, [setTitle]);
  const [query, setQuery] = useState<string>('');
  const filteredProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(query.toLowerCase());
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Input
          className="w-[500px]"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CreateProject />
      </div>
      <div className="flex gap-4 flex-wrap">
        {filteredProjects.length ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="text-xl font-medium w-full text-center mt-3">
            Начните добавлять проекты!
          </div>
        )}
      </div>
    </div>
  );
}
