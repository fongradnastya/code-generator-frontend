import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const TemplatesPage = lazy(() => import('./pages/TemplatesPage').then(module => ({ default: module.TemplatesPage })));

/** Templates routes. */
export const templatesRoutes: RouteObject[] = [
  {
    path: 'templates',
    element: <TemplatesPage />,
  },
];
