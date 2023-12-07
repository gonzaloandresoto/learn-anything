import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Loader from './components/other/Loader';

const ProtectedRoutes = () => {
  const { user, isAuthenticating } = useAuthContext();

  if (isAuthenticating)
    return (
      <div className='flex grow justify-center items-center bg-tertiary-tan'>
        <Loader />
      </div>
    );

  return user !== null ? (
    <Outlet />
  ) : (
    <>
      <Navigate to='/signin' />
    </>
  );
};

export default ProtectedRoutes;
