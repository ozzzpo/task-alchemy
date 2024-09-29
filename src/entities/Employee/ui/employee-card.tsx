import { Divider } from '@/shared/ui/divider';
import { EllipsisVerticalIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
export function EmployeeCard() {
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex justify-between px-5">
        <div className="flex gap-5">
          <img width="40px" src="./Avatar.svg" alt="" />
          <div className="flex flex-col">
            <span>Иван Иванов</span>
            <span>sdj@mail.ru</span>
          </div>
        </div>
        <div className="flex items-center">
          <span>+832232322332</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-3 bg-blue-200 px-5 py-2 rounded-[8px]">
            <div className="rounded-[50%] bg-blue-500 w-3 h-3"></div>
            <span>Разработка</span>
          </div>
        </div>
        <div className="flex items-center">
          <span>Backend разработчик</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="py-2 px-6 border border-slate-300 rounded-[4px]">
            Проекты
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-2 border border-slate-300 rounded-[4px]">
                <EllipsisVerticalIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>ijojojojjoo</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Divider />
    </div>
  );
}
