import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const TemplateCreationPage = lazy(() => import('./pages/TemplateCreationPage').then(module => ({ default: module.TemplateCreationPage })));

/** Template creation routes. */
export const templateCreationRoutes: RouteObject[] = [
  {
    path: 'template',
    element: <TemplateCreationPage />,
  },
];
