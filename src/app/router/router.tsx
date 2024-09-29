import { Auth } from '@/pages/Auth';
import { RootLayout } from '@/widgets/root-layout/root-layout';
import { Sidebar } from '@/widgets/sidebar/sidebar';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { Profile } from '@/pages/Profile';
import { Tasks } from '@/pages/Tasks/Tasks';
import { Projects } from '@/pages/Projects';
import { Portfolio } from '@/pages/Portfolio';
import { Employees } from '@/pages/Employees';
import { Settings } from '@/pages/Settings';
import { WithTitle } from '@/widgets/with-title';
import { Project } from '@/pages/Project';

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
        element: <WithTitle />,
        children: [
          { index: true, element: <Navigate to="/projects" /> },
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
            path: 'projects/:projectId',
            element: <Project />,
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
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);
