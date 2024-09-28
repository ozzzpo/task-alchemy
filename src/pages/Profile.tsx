import { useAppStore } from '@/entities/App/app.store';
import { useEffect } from 'react';

export function Profile() {
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Профиль');
  }, [setTitle]);
  return <div>Profile</div>;
}
