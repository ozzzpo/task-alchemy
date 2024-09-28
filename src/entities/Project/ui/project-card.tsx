import { Project } from '@/shared/types/project.type';
import { Progress } from '@/shared/ui/progress';
import { Calendar, Target } from 'lucide-react';
import { DateTime } from 'luxon';
import { calculateProjectProgress } from '../lib/calculateProjectProgress';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../model/project.store';

export function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const { setCurrentProject } = useProjectStore();
  const progress = calculateProjectProgress(project);
  return (
    <div
      className="flex flex-col gap-2.5 w-[350px] px-5 py-3 rounded-xl shadow-lg text-neutral-700 hover:-translate-y-1 transition cursor-pointer"
      onClick={() => {
        navigate(`/projects/${project.id}`);
        setCurrentProject(project.id);
      }}
    >
      <h3 className="text-2xl font-medium ">{project.title}</h3>
      <p className="text-lg  flex-1">{project.description}</p>
      <div className="flex items-center gap-1.5">
        <Calendar className="min-w-4 min-h-4" />
        {DateTime.fromISO(project.start_date)
          .setLocale('ru')
          .toFormat('dd MMMM')}
      </div>
      <div className="flex items-center gap-1.5">
        <Target className="min-w-4 min-h-4" />
        {DateTime.fromISO(project.end_date)
          .setLocale('ru')
          .toFormat('dd MMMM yyyy')}
      </div>
      <div className="flex items-center gap-2">
        <Progress value={progress} />
        <span>{progress}%</span>
      </div>
    </div>
  );
}
