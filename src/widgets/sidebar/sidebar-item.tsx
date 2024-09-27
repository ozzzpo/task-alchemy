import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SidebarItem({
  item,
}: {
  item: { icon: LucideIcon; title: string; link: string };
}) {
  return (
    <Link
      to={item.link}
      className="w-full h-fit flex items-center gap-3 py-1.5 px-2 rounded-sm text-neutral-700 hover:text-blue-600 hover:bg-blue-100 transition"
    >
      <item.icon className="min-w-8 min-h-8" />
      <p className="font-medium opacity-0 group-hover:opacity-100 transition-all duration-700">
        {item.title}
      </p>
    </Link>
  );
}
