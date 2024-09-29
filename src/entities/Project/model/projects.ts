import { Project } from '@/shared/types/project.type';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Мобильное приложение для учёта времени',
    description:
      'Мобильное приложение для отслеживания и управления личным временем студентов. ',
    start_date: '2024-09-01',
    end_date: '2024-12-15',
    tasks: [
      {
        id: '1',
        title: 'Разработка интерфейса главного экрана',
        description:
          'Создание дизайна главного экрана с функционалом добавления задач и просмотра статистики.',
        startDate: '2024-09-01',
        endDate: '2024-09-30',
        priority: 'high',
        completed: true,
        projectId: 1,
      },
      {
        id: '2',
        title: 'Интеграция с календарём',
        description:
          'Добавление возможности синхронизации с календарями Google и Outlook.',
        startDate: '2024-08-12',
        endDate: '2024-09-15',
        priority: 'medium',
        completed: true,
        projectId: 1,
      },
      {
        id: '3',
        title: 'Тестирование функционала уведомлений',
        description:
          'Проверка корректной работы уведомлений для задач с дедлайнами.',
        startDate: '2024-09-01',
        endDate: '2024-09-15',
        priority: 'low',
        completed: false,
        projectId: 1,
      },
      {
        id: '7',
        title: 'Тестирование абобы',
        description:
          'Проверка корректной работы уведомлений для задач с дедлайнами.',
        startDate: '2024-09-01',
        endDate: '2024-09-15',
        priority: 'low',
        completed: false,
        projectId: 1,
      },
      {
        id: '8',
        title: 'Тестирование бебры',
        description:
          'Проверка корректной работы уведомлений для задач с дедлайнами.',
        startDate: '2024-07-15',
        endDate: '2024-09-15',
        priority: 'low',
        completed: false,
        projectId: 1,
      },
      {
        id: '9',
        title: 'Тестирование функционала уведомлений',
        description:
          'Проверка корректной работы уведомлений для задач с дедлайнами.',
        startDate: '2024-10-01',
        endDate: '2024-10-15',
        priority: 'low',
        completed: false,
        projectId: 1,
      },
    ],
    assignees: [
      {
        id: 101,
        name: 'Иван Петров',
        role: 'Разработчик',
      },
      {
        id: 102,
        name: 'Анастасия Смирнова',
        role: 'Дизайнер',
      },
    ],
    columns: [
      {
        id: '1',
        title: 'Бэклог',
        taskIds: ['1', '2', '3'],
      },
      {
        id: '2',
        title: 'Очередь задач',
        taskIds: ['7', '8', '9'],
      },
      {
        id: '3',
        title: 'В работе',
        taskIds: [],
      },
      {
        id: '4',
        title: 'Тестируется',
        taskIds: [],
      },
      {
        id: '5',
        title: 'Готово',
        taskIds: [],
      },
    ],
  },
  {
    id: 2,
    title: 'Веб-сервис для фрилансеров',
    description:
      'Веб-сервис для студентов, на котором они могут предлагать свои услуги и находить исполнителей на различные проекты.',
    start_date: '2024-08-15',
    end_date: '2024-11-30',
    tasks: [
      {
        id: '4',
        title: 'Создание страницы профиля исполнителя',
        description:
          'Реализация страницы с отображением рейтинга, выполненных проектов и отзывов.',
        startDate: '2024-09-01',
        endDate: '2024-09-15',
        priority: 'high',
        completed: false,
        projectId: 2,
      },
      {
        id: '5',
        title: 'Подключение платёжной системы',
        description:
          'Интеграция системы для безопасных расчётов между заказчиком и исполнителем.',
        startDate: '2024-09-01',
        endDate: '2024-09-15',
        priority: 'high',
        completed: false,
        projectId: 2,
      },
      {
        id: '6',
        title: 'Написание тестов для функционала сообщений',
        description:
          'Проверка работы системы внутренних сообщений между пользователями.',
        startDate: '2024-09-01',
        endDate: '2024-09-15',
        priority: 'high',
        completed: true,
        projectId: 2,
      },
    ],
    assignees: [
      {
        id: 103,
        name: 'Дмитрий Иванов',
        role: 'Backend-разработчик',
      },
      {
        id: 104,
        name: 'Елена Кузнецова',
        role: 'Frontend-разработчик',
      },
    ],
    columns: [
      {
        id: '6',
        title: 'Бэклог',
        taskIds: ['4', '6'],
      },
      {
        id: '7',
        title: 'Очередь задач',
        taskIds: ['5'],
      },
      {
        id: '8',
        title: 'В работе',
        taskIds: [],
      },
    ],
  },
];
