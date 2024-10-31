import { type FC } from 'react';
import { Navigate, type RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from 'src/features/auth/routes';
import { homeRoutes } from 'src/features/home/routes';
import { codeEditorRoutes } from 'src/features/codeEditor/routes';
import { projectCreationRoutes } from 'src/features/projectCreation/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...homeRoutes,
  ...authRoutes,
  ...codeEditorRoutes,
  ...projectCreationRoutes,
];

/** Root router. */
export const RootRouter: FC = () => useRoutes(routes);
