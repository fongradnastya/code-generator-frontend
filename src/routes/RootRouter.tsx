import { type FC } from 'react';
import { Navigate, type RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from 'src/features/auth/routes';
import { codeEditorRoutes } from 'src/features/codeEditor/routes';
import { projectCreationRoutes } from 'src/features/projectCreation/routes';
import { projectsRoutes } from 'src/features/projects/routes';
import { projectSuggestionRoutes } from 'src/features/suggestProject/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
  ...authRoutes,
  ...codeEditorRoutes,
  ...projectCreationRoutes,
  ...projectsRoutes,
  ...projectSuggestionRoutes,
];

/** Root router. */
export const RootRouter: FC = () => useRoutes(routes);
