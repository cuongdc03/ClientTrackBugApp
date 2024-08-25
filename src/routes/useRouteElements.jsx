import { useRoutes } from 'react-router-dom'
import SignIn from '../pages/Authentication/Signin'
import { path } from './path'
import MainLayout from '../component/layouts/MainLayout/MainLayout'
import RegisterForm from '../pages/Authentication/Register'
import ProjectTable from '../component/ProjectTable/ProjectTable'
import BugsPage from '../pages/BugPage/BugPage'

export default function useRouteElements() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: path.projects,
          element: <ProjectTable />,
          index: true
        },
        {
          path: path.bugs,
          element: <BugsPage />,
          index: true
        }
      ]
    },
    {
      path: path.login,
      element: <SignIn />
    },
    {
      path: path.register,
      element: <RegisterForm />
    }
  ])
}
