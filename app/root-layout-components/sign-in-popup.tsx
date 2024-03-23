import { Link } from '@remix-run/react'
import { PopupLayout } from '~/atoms/popup-atoms'

export default function SignInPopup() {
  console.log('sign-in rendered')
  return (
    <PopupLayout name='sign-in'>
      <div className='z-50 m-0 h-[90%] rounded-t-xl bg-white px-[17px] pt-[16px] md:h-[380px] md:w-[430px] md:rounded-xl'>
        <h2 className='mb-4 text-2xl font-bold'>Sign in</h2>
        <form className='w-full max-w-sm'>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              id='email'
              type='email'
              placeholder='Enter email'
            />
          </div>
          <div className='mb-6'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              id='password'
              type='password'
              placeholder='Enter password'
            />
          </div>
          <div className='flex flex-col items-center'>
            <button
              className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
              type='submit'
            >
              Sign in
            </button>
            <Link
              className='inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800'
              to='/sign-up'
            >
              or Sign up
            </Link>
          </div>
        </form>
      </div>
    </PopupLayout>
  )
}
