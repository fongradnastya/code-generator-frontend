import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const SuggestProjectPage = lazy(() => import('./pages/SuggestProjectPage').then(module => ({ default: module.SuggestProjectPage })));

/** Project suggestion routes. */
export const projectSuggestionRoutes: RouteObject[] = [
  {
    path: 'suggest',
    element: <SuggestProjectPage />,
  },
];
