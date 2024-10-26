import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const EditorPage = lazy(() => import('./pages/EditorPage').then(module => ({ default: module.EditorPage })));

/** Code editor routes. */
export const codeEditorRoutes: RouteObject[] = [
  {
    path: 'editor',
    element: <EditorPage />,
  },
];
