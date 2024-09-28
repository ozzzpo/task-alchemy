import { useUserStore } from '@/entities/User/model/user.store';
import { LoginForm } from '@/features/login-form';
import { RegisterForm } from '@/features/register-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Auth() {
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const { isAuth } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  return (
    <div className="w-full h-full flex flex-col items-center ">
      <div className="text-center pt-12 space-y-2">
        <h1 className="text-5xl ">TaskAlchemy.</h1>
        <p className="text-3xl">Твой проектный менеджер.</p>
      </div>
      <div className=" flex flex-col flex-1 pb-40 items-center justify-center">
        {authType === 'login' ? (
          <LoginForm setAuthType={setAuthType} />
        ) : (
          <RegisterForm setAuthType={setAuthType} />
        )}
      </div>
    </div>
  );
}
