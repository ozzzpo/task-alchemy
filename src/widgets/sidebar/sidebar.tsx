import { SIDEBAR_ITEMS } from '@/shared/constants/SIDEBAR_ITEMS';
import { SidebarItem } from './sidebar-item';
import { LogOut, Moon } from 'lucide-react';
import { useUserStore } from '@/entities/User/model/user.store';
import { ToggleTheme } from '@/features/toggle-theme';

export function Sidebar() {
  const { logout } = useUserStore();
  return (
    <aside className="h-screen bg-white shadow-xl min-w-fit group overflow-hidden px-2 py-4">
      <div className="flex flex-col h-full gap-3 w-12 group-hover:w-52 transition-all duration-500">
        <div className="flex items-center gap-2">
          <div className="w-fit">
            <img
              src="/logo.png"
              className="min-w-12 max-w-12 min-h-10 filter invert"
              alt="#"
            />
          </div>
          <p className=" text-xl font-bold text-neutral-700 opacity-0 group-hover:opacity-100 transition-all duration-500">
            TaskAlchemy
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem item={item} key={item.title} />
          ))}
        </div>
        <ToggleTheme />
        <div
          className="w-full h-fit flex items-center gap-3 py-1.5 px-2 rounded-sm text-white bg-neutral-700 cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="min-w-8 min-h-8" />
          <p className="opacity-0 group-hover:opacity-100 transition-all duration-700 ">
            Выход
          </p>
        </div>
      </div>
    </aside>
  );
}
