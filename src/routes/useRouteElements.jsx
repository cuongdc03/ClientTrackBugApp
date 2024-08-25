import { useRoutes } from 'react-router-dom';
import SignIn from '../pages/Authentication/Signin';
import { path } from './path';
import MainLayout from '../component/layouts/MainLayout/MainLayout';

export default function useRouteElements() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
      ]
    },
    {
      path: path.login,
      element: <SignIn /> 
    }
  ]);
}
