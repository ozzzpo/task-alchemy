import { Flag } from 'lucide-react';
import { PRIORITIES } from '../constants/PRIORITIES';

export function PriorityTag({ priority }: { priority: string }) {
  return (
    <div
      className={`h-fit w-fit rounded-lg text-xs px-1.5 py-0.5 flex items-center gap-0.5 ${
        priority === 'low'
          ? 'bg-green-300'
          : priority === 'medium'
          ? 'bg-yellow-200'
          : 'bg-red-300'
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
      {PRIORITIES[priority as keyof typeof PRIORITIES]}
    </div>
  );
}
