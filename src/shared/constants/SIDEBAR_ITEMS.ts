import {
  BriefcaseBusiness,
  Folder,
  NotebookPen,
  Settings,
  UserRound,
  UsersRound,
} from 'lucide-react';

export const SIDEBAR_ITEMS = [
  {
    title: 'Профиль',
    link: 'profile',
    icon: UserRound,
  },
  {
    title: 'Задачи',
    link: 'tasks',
    icon: NotebookPen,
  },
  {
    title: 'Проекты',
    link: 'projects',
    icon: Folder,
  },
  {
    title: 'Портфель',
    link: 'portfolio',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Сотрудники',
    link: 'employees',
    icon: UsersRound,
  },
  {
    title: 'Настройки',
    link: 'settings',
    icon: Settings,
  },
];
