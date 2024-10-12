import { type FC } from 'react';
import {
  Navigate, Outlet, type To, useLocation,
} from 'react-router-dom';

import { useAppSelector } from 'src/store';
import { selectUser } from 'src/store/user/selectors';

/** Auth guard. */
export const AuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
