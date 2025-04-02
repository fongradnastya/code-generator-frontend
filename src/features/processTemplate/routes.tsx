import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const TemplateCreationPage = lazy(() => import('./pages/ProcessTemplatePage').then(module => ({ default: module.ProcessTemplatePage })));

/** Template creation routes. */
export const templateCreationRoutes: RouteObject[] = [
  {
    path: 'process',
    element: <TemplateCreationPage />,
  },
];
