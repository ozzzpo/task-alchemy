import { useAppStore } from '@/entities/App/app.store';
import { useEffect } from 'react';

export function Employees() {
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Сотрудники');
  }, [setTitle]);
  return <div>Employees</div>;
}
