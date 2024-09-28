import { Moon } from 'lucide-react';

export function ToggleTheme() {
  return (
    <div className="w-full h-fit flex items-center gap-3 py-1.5 px-2 rounded-sm">
      <Moon className="min-w-8 min-h-8" />
      <p className="opacity-0 group-hover:opacity-100 transition-all duration-700">
        Dark
      </p>
    </div>
  );
}
