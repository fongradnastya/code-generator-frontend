import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));

/** Projects routes. */
export const projectsRoutes: RouteObject[] = [
  {
    path: 'projects',
    element: <ProjectsPage />,
  },
];
