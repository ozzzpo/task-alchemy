import { useUserStore } from '@/entities/User/model/user.store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
type FormData = {
  email: string;
  password: string;
};
export function LoginForm({
  setAuthType,
}: {
  setAuthType: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
}) {
  const { register, handleSubmit } = useForm<FormData>();
  const { login } = useUserStore();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    login(data);
  };
  return (
    <form
      className="flex flex-col gap-3 shadow-xl py-5 px-10 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-semibold text-center">Войти в аккаунт</h2>
      <div>
        <label htmlFor="email">Электронная почта</label>
        <Input id="email" {...register('email')} type="email" />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <Input id="password" {...register('password')} type="password" />
        <p className="text-xs text-right">Забыли пароль?</p>
      </div>
      <Button className="w-full">Войти</Button>
      <p>
        Нет аккаунта?{' '}
        <span
          className="underline text-blue-500 cursor-pointer"
          onClick={() => setAuthType('register')}
        >
          Зарегистрироваться
        </span>
      </p>
    </form>
  );
}
