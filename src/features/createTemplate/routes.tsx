import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const TemplateCreationPage = lazy(() => import('./pages/TemplateCreationPage').then(module => ({ default: module.TemplateCreationPage })));

/** Template procession routes. */
export const templateSuggestionRoutes: RouteObject[] = [
  {
    path: 'create',
    element: <TemplateCreationPage />,
  },
];
