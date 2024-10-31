import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const ProjectCreationPage = lazy(() => import('./pages/ProjectCreationPage').then(module => ({ default: module.ProjectCreationPage })));

/** Project creation routes. */
export const projectCreationRoutes: RouteObject[] = [
  {
    path: 'project',
    element: <ProjectCreationPage />,
  },
];
