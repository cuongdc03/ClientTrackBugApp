import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { schema } from '../../component/utils/rules'
import { post } from '../../apis/api'
import { setTokenToLocalStorage } from '../../component/utils/localStorage'
import { ENDPOINTS } from '../../apis/constants'
import { useNavigate } from 'react-router-dom'
import { path } from '../../routes/path'

const loginSchema = schema.pick(['email', 'password'])

const SignIn = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      const response = await post(ENDPOINTS.LOGIN, data)
      toast.success('Logged in successfully')
      setTokenToLocalStorage(response.token)
      navigate(path.dashboard)
    } catch (error) {
      toast.error(error.message || 'Login failed!')
    }
  }

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <div className='text-center mb-6'>
          <FaSignInAlt className='text-primary text-4xl' />
          <h2 className='text-2xl font-bold text-gray-800 mt-4'>Sign In</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <div className='flex items-center border border-gray-300 rounded px-3 py-2'>
              <FaEnvelope className='text-gray-400 mr-3' />
              <input
                {...register('email', { required: 'Email is required' })}
                type='text'
                className='w-full focus:outline-none'
                placeholder='Enter your email'
              />
            </div>
            {errors.email && <p className='text-red-500 text-xs mt-2'>{errors.email.message}</p>}
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700'>Password</label>
            <div className='flex items-center border border-gray-300 rounded px-3 py-2'>
              <FaLock className='text-gray-400 mr-3' />
              <input
                {...register('password', { required: 'Password is required' })}
                type='password'
                className='w-full focus:outline-none'
                placeholder='Enter your password'
              />
            </div>
            {errors.password && <p className='text-red-500 text-xs mt-2'>{errors.password.message}</p>}
          </div>

          <div>
            <button
              type='submit'
              className='w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition duration-150'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
