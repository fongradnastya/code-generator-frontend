import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('./pages').then(module => ({ default: module.HomePage })));

/** Home routes. */
export const homeRoutes: RouteObject[] = [
  {
    path: '',
    element: <HomePage />,
  },
];
