import { type FC } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { selectUserEmail } from 'src/store/authorization/selectors';
import { useAppSelector } from 'src/store';

/** Non auth guard. */
export const NonAuthGuard: FC = () => {
  const email = useAppSelector(selectUserEmail);
  const [search] = useSearchParams();

  if (email != null) {
    const redirect = search.get('next') ?? '';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
