import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { post } from '../../apis/api'
import { setTokenToLocalStorage } from '../../component/utils/localStorage'
import { ENDPOINTS } from '../../apis/constants'
import { useNavigate } from 'react-router-dom'
import { path } from '../../routes/path'
const RegisterForm = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm()

  const onSubmit = async () => {
    const { password, confirmPassword, ...rest } = getValues()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    try {
      const response = await post(ENDPOINTS.REGISTER, {
        ...rest,
        password
      })

      if (response) {
        toast.success('Registration successful!')
        setTokenToLocalStorage(response.token)
        navigate(path.projects)
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message || 'Registration failed!')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              id='name'
              type='text'
              {...register('name', { required: 'name is required' })}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email', { required: 'Email is required' })}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              id='password'
              type='password'
              {...register('password', { required: 'Password is required' })}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
          </div>

          <div className='mb-4'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Confirm Password
            </label>
            <input
              id='confirmPassword'
              type='password'
              {...register('confirmPassword', { required: 'Confirming password is required' })}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
          </div>

          <div className='mb-4'>
            <span className='block text-sm font-medium text-gray-700'>Role</span>
            <div className='flex items-center space-x-4 mt-2'>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  value='developer'
                  {...register('role', { required: 'Role is required' })}
                  className='form-radio text-blue-500'
                />
                <span className='ml-2'>Developer</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='radio'
                  value='tester'
                  {...register('role', { required: 'Role is required' })}
                  className='form-radio text-blue-500'
                />
                <span className='ml-2'>Tester</span>
              </label>
            </div>
            {errors.role && <p className='text-red-500 text-sm mt-1'>{errors.role.message}</p>}
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
