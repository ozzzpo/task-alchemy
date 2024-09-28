import { useUserStore } from '@/entities/User/model/user.store';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useUserStore();
  if (!isAuth) {
    return <Navigate to={'/auth'} />;
  }
  return <>{children}</>;
};
