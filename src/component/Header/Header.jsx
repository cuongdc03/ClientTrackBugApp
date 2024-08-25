import { FaSearch, FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DanangExpLogo from '../../assets/DanangExpert.png'
import { navLinks } from './constants'

const Header = () => {
  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto flex items-center justify-between py-4 px-4 lg:px-8'>
        <div className='flex items-center'>
          <img src={DanangExpLogo} alt='Logo' className='h-10 w-auto' />
        </div>

        <nav className='hidden md:flex space-x-8'>
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className='text-gray-800 hover:text-blue-600'>
              {link.label} <span className='inline-block align-middle'>&#x25BC;</span>
            </Link>
          ))}
        </nav>

        <div className='flex items-center space-x-6'>
          <button className='text-gray-800 hover:text-blue-600'>
            <FaSearch className='w-5 h-5' />
          </button>
          <div className='flex items-center space-x-2'>
            <FaBars className='w-5 h-5 text-blue-600' />
            <div className='text-gray-800'>
              <span className='block text-sm'>Contact For Support</span>
              <span className='block text-lg font-bold'>+84.876666634</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
