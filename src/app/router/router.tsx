import { Auth } from '@/pages/Auth';
import { RootLayout } from '@/widgets/root-layout/root-layout';
import { Sidebar } from '@/widgets/sidebar/sidebar';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { Profile } from '@/pages/Profile';
import { Tasks } from '@/pages/Tasks';
import { Projects } from '@/pages/Projects';
import { Portfolio } from '@/pages/Portfolio';
import { Employees } from '@/pages/Employees';
import { Settings } from '@/pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <RootLayout sidebarElement={<Sidebar />} />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <Auth />,
  },
]);
