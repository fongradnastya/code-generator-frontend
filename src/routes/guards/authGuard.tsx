import { type FC } from 'react';
import { Navigate, Outlet, type To, useLocation } from 'react-router-dom';
import { selectUserEmail } from 'src/store/authorization/selectors';
import { useAppSelector } from 'src/store';

/** Auth guard. */
export const AuthGuard: FC = () => {
  const email = useAppSelector(selectUserEmail);
  const location = useLocation();

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (email == null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
