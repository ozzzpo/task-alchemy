import { useAppStore } from '@/entities/App/app.store';
import { useEffect } from 'react';

export function Settings() {
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Настройки');
  }, [setTitle]);
  return <div>Settings</div>;
}
