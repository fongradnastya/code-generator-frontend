import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const SuggestTemplatePage = lazy(() => import('./pages/TemplateCreationPage').then(module => ({ default: module.SuggestTemplatePage })));

/** Template suggestion routes. */
export const templateSuggestionRoutes: RouteObject[] = [
  {
    path: 'suggest',
    element: <SuggestTemplatePage />,
  },
];
