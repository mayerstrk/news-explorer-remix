import { ReactNode } from 'react'
export function PopupFormLayout({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <div className='z-50 m-0 h-[90%] rounded-t-xl bg-white md:h-[380px] md:w-[430px] md:rounded-xl'>
      <h2 className='mb-4 text-2xl font-bold'>{title}</h2>
      <form className='w-full max-w-sm'>{children}</form>
    </div>
  )
}

export function PopupFormControls() {
  return (
    <div className='flex flex-col items-center'>
      <button
        className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
        type='submit'
      >
        Sign in
      </button>
      <button
        type='button'
        className='inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800'
      >
        or Sign up
      </button>
    </div>
  )
}
export function FormInput({
  label,
  htmlFor,
  id,
  type,
  placeholder,
}: {
  label: string
  htmlFor: string
  id: string
  type: string
  placeholder: string
}) {
  return (
    <div className='mb-4'>
      <label
        className='mb-2 block text-sm font-bold text-gray-700'
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}
