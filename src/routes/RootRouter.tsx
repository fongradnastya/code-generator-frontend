import { type FC } from 'react';
import { Navigate, type RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from 'src/features/auth/routes';
import { projectCreationRoutes } from 'src/features/projectCreation/routes';
import { projectsRoutes } from 'src/features/projects/routes';
import { projectSuggestionRoutes } from 'src/features/suggestProject/routes';

import { AuthGuard } from './guards/authGuard';

const protectedRoutes: RouteObject = {
  path: '/',
  element: <AuthGuard />,
  children: [
    ...projectCreationRoutes,
    ...projectsRoutes,
    ...projectSuggestionRoutes,
  ],
};

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
  ...authRoutes,
  protectedRoutes,
];

/** Root router. */
export const RootRouter: FC = () => useRoutes(routes);
