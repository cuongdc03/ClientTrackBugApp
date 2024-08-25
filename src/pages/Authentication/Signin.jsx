import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { schema } from '../../component/utils/rules'
import { login } from '../../apis/user'
import { setTokenToLocalStorage } from '../../component/utils/localStorage'

const loginSchema = schema.pick(['userName', 'password'])

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    const response = await login(data)
    if (response) {
      toast.success('Logged in successfully')
      setTokenToLocalStorage(response)
    }
  })

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <div className='text-center mb-6'>
          <FaSignInAlt className='text-primary text-4xl justify-end items-end' />
          <h2 className='text-2xl font-bold text-gray-800 mt-4'>Sign In </h2>
        </div>

        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <div className='flex items-center border border-gray-300 rounded px-3 py-2'>
              <FaEnvelope className='text-gray-400 mr-3' />
              <input
                name='userName'
                {...register('userName', { required: true })}
                type='text'
                className='w-full focus:outline-none'
                placeholder='Enter your username'
              />
            </div>
            {errors.userName && <p className='text-red-500 text-xs mt-2'>{errors.userName.message}</p>}
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700'>Password</label>
            <div className='flex items-center border border-gray-300 rounded px-3 py-2'>
              <FaLock className='text-gray-400 mr-3' />
              <input
                name='password'
                {...register('password', { required: true })}
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
