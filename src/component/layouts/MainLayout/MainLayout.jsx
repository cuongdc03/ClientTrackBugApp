import { Outlet } from 'react-router-dom'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className='mx-auto my-0 block pt-[var(--header-menu-height)]'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
