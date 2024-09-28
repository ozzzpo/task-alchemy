import { useAppStore } from '@/entities/App/app.store';
import { useEffect } from 'react';

export function Portfolio() {
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Портфель');
  }, [setTitle]);
  return <div>Portfolio</div>;
}
