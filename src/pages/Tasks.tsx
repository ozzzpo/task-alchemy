import { useAppStore } from '@/entities/App/app.store';
import { useEffect } from 'react';

export function Tasks() {
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Задачи');
  }, [setTitle]);
  return <div>Tasks</div>;
}
