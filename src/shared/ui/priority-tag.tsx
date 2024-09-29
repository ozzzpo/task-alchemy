import { Flag } from 'lucide-react';
import { PRIORITIES } from '../constants/PRIORITIES';

export function PriorityTag({ priority }: { priority: string }) {
  return (
    <div
      className={`h-fit min-w-20 w-fit rounded-lg text-xs px-2 py-1.5 flex items-center gap-0.5 ${
        priority === 'low'
          ? 'bg-green-200'
          : priority === 'medium'
          ? 'bg-yellow-200'
          : 'bg-red-200'
      }`}
    >
      <Flag
        className={`w-3 h-3 ${
          priority === 'low'
            ? 'text-green-600'
            : priority === 'medium'
            ? 'text-yellow-600'
            : 'text-red-600'
        }`}
      />
      <p className="text-neutral-600">
        {PRIORITIES[priority as keyof typeof PRIORITIES]}
      </p>
    </div>
  );
}
