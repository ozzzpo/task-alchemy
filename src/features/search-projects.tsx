import { useProjectStore } from '@/entities/Project/model/project.store';
import { Project } from '@/shared/types/project.type';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

export const SearchProjects = ({
  employeeProjects,
  setEmployeeProjects,
}: {
  employeeProjects: Project[];
  setEmployeeProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) => {
  const { projects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasBeenChosen = (project: Project) => {
    return employeeProjects.some((p) => p.id === project.id);
  };

  return (
    <div className="bg-[#F2F4F5]  px-5 overflow-scroll rounded-xl space-y-5 max-h-[400px] min-w-[50%]">
      <div className="sticky top-0 left-0 bg-[#F2F4F5] py-2">
        <h2 className="text-2xl font-medium mb-2 ">Все проекты</h2>
        <Input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-2 bg-white p-4 mb-4 rounded-xl"
            >
              <h2 className="font-bold text-lg">{project.title}</h2>
              <p>{project.description}</p>
              {hasBeenChosen(project) ? (
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-500"
                  onClick={() =>
                    setEmployeeProjects((prev) =>
                      prev.filter((p) => p.id !== project.id)
                    )
                  }
                >
                  Выбрано
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() =>
                    setEmployeeProjects((prev) => [...prev, project])
                  }
                >
                  Добавить в список
                </Button>
              )}
            </div>
          ))
        ) : (
          <p>Проектов не найдено</p>
        )}
      </div>
    </div>
  );
};
