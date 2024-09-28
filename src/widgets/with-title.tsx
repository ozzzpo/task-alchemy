import { useAppStore } from '@/entities/App/app.store';
import { ChevronLeft } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function WithTitle() {
  const { title } = useAppStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDeep = pathname.split('/').length > 2;
  return (
    <div className="w-full min-h-full flex flex-col gap-4 p-4  overflow-x-scroll">
      <h1 className="flex gap-1 items-center text-3xl font-semibold text-neutral-700">
        {isDeep ? (
          <ChevronLeft
            className="min-w-8 min-h-8 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        ) : null}
        {title}
      </h1>
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
