import { useRoutes } from 'react-router-dom';
import SignIn from '../pages/Authentication/Signin';
import { path } from './path';
import MainLayout from '../component/layouts/MainLayout/MainLayout';
import RegisterForm from '../pages/Authentication/Register';

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
    },
    {
        path:path.register,
        element:<RegisterForm/>
    }
  ]);
}
