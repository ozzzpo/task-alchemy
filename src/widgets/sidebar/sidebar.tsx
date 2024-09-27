import { SIDEBAR_ITEMS } from '@/shared/constants/SIDEBAR_ITEMS';
import { SidebarItem } from './sidebar-item';
import { LogOut, Moon } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="h-screen shadow-xl w-fit group overflow-hidden px-2 py-3">
      <div className="flex flex-col h-full gap-3 w-12 group-hover:w-52 transition-all duration-500">
        <div className="flex gap-2">
          <p>Icon</p>
          <p className="opacity-0 group-hover:opacity-100 transition-all duration-500">
            TaskAlchemy
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem item={item} key={item.title} />
          ))}
        </div>
        <div className="w-full h-fit flex items-center gap-3 py-1.5 px-2 rounded-sm">
          <Moon className="min-w-8 min-h-8" />
          <p className="opacity-0 group-hover:opacity-100 transition-all duration-700">
            Dark
          </p>
        </div>
        <div className="w-full h-fit flex items-center gap-3 py-1.5 px-2 rounded-sm text-white bg-neutral-700">
          <LogOut className="min-w-8 min-h-8" />
          <p className="opacity-0 group-hover:opacity-100 transition-all duration-700">
            Выход
          </p>
        </div>
      </div>
    </aside>
  );
}
