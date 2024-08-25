import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export const mapPosition = [16.047079, 108.20623]

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Our Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/company', label: 'Our Company' }
]

export const socialLinks = [
  {
    href: 'https://facebook.com',
    icon: <FaFacebookF className='w-5 h-5' />,
    label: 'Facebook'
  },
  {
    href: 'https://twitter.com',
    icon: <FaTwitter className='w-5 h-5' />,
    label: 'Twitter'
  },
  {
    href: 'https://instagram.com',
    icon: <FaInstagram className='w-5 h-5' />,
    label: 'Instagram'
  },
  {
    href: 'https://linkedin.com',
    icon: <FaLinkedinIn className='w-5 h-5' />,
    label: 'LinkedIn'
  }
]
