import { type FC } from 'react';
import { Navigate, type RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from 'src/features/auth/routes';
import { templateCreationRoutes } from 'src/features/templateCreation/routes';
import { templatesRoutes } from 'src/features/templates/routes';
import { templateSuggestionRoutes } from 'src/features/suggestTemplate/routes';

import { AuthGuard } from './guards/authGuard';

const protectedRoutes: RouteObject = {
  path: '/',
  element: <AuthGuard />,
  children: [
    ...templateCreationRoutes,
    ...templatesRoutes,
    ...templateSuggestionRoutes,
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
