import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useForm } from 'react-hook-form';

export function RegisterForm({
  setAuthType,
}: {
  setAuthType: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form
      className="flex flex-col gap-2 shadow-xl py-5 px-10 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-semibold text-center">Зарегистрироваться</h2>
      <div>
        <label htmlFor="email">Электронная почта</label>
        <Input id="email" {...register('email')} type="email" />
      </div>
      <div>
        <label htmlFor="password">Пароль</label>
        <Input id="password" {...register('password')} type="password" />
      </div>
      <div>
        <label htmlFor="password">Повторите пароль</label>
        <Input id="password" {...register('password')} type="password" />
      </div>
      <Button className="w-full mt-3">Зарегистрироваться</Button>
      <p className="text-center">
        Уже есть аккаунт?{' '}
        <span
          className="underline text-blue-500 cursor-pointer"
          onClick={() => setAuthType('login')}
        >
          Войти
        </span>
      </p>
    </form>
  );
}
