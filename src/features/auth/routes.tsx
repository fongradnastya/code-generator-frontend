import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { NonAuthGuard } from 'src/routes/guards/nonAuthGuard';

const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));

/** Auth routes. */
export const authRoutes: RouteObject[] = [
  {
    element: <NonAuthGuard />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate to="login" />,
      },
    ],
  },
];
