import { useAppStore } from '@/entities/App/app.store';
import { useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { Input } from '@/shared/ui/input';
export function Profile() {
  const { setTitle } = useAppStore();
  useEffect(() => {
    setTitle('Профиль');
  }, [setTitle]);
  return <div className='w-[30%] flex flex-col gap-10'>
    <div className='flex gap-10'>
      <img width='100px' src="./Avatar.svg" alt="" />
      <div className='w-[100%] flex flex-col gap-4'>
        <div>
          <span>Имя</span>
          <Input placeholder='Введите имя'/>
        </div>
        <div>
          <span>Фамилия</span>
          <Input placeholder='Введите фамилию'/>
        </div>
      </div>
    </div>
    <div>
      <h1 className='font-semibold text-2xl'>Обо мне</h1>
      <Textarea placeholder='Напишите о себе' rows={5}/>
    </div>
    <div className='flex justify-between'>
      <Button className='w-1/3 bg-blue-500'>
        Сохранить
      </Button>
      <Button className='w-1/3 bg-neutral-700'>
        Отменить
      </Button>
    </div>
  </div>;
}
