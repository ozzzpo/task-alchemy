import { useAppStore } from '@/entities/App/app.store';
import { Outlet } from 'react-router-dom';

export function WithTitle() {
  const { title } = useAppStore();
  return (
    <div className="w-full min-h-full flex flex-col gap-4 p-4  overflow-x-scroll">
      <h1 className="text-3xl font-semibold text-neutral-700">{title}</h1>
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
