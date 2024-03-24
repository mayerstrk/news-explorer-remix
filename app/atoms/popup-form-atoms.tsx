import { ReactNode } from 'react'
import { usePopupRedirect } from '~/hooks/zustand/use-popup'
import { PopupName } from '~/utils/string-unions'

export interface AuthPopupSettings {
  name: PopupName
  title: string
  inputs: {
    label: string
    htmlFor: string
    id: string
    type: string
    placeholder: string
  }[]
  controls: {
    mainText: string
    orText: string
    redirectFrom: PopupName
    redirectTo: PopupName
  }
}
export function PopupFormLayout({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <div className='z-50 m-0 flex h-[90%] flex-col rounded-t-xl bg-white pb-[28px] md:h-auto md:w-[430px] md:rounded-xl md:px-[36px] md:pt-[34px]'>
      <h2 className='mb-4 text-2xl font-bold'>{title}</h2>
      <form className='w-full max-w-sm'>{children}</form>
    </div>
  )
}

export function PopupFormControls({
  settings,
}: {
  settings: AuthPopupSettings['controls']
}) {
  const redirect = usePopupRedirect(settings.redirectFrom, settings.redirectTo)
  return (
    <div className='flex flex-col items-center'>
      <button
        className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
        type='submit'
      >
        {settings.mainText}
      </button>
      <button
        type='button'
        className='inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800'
        onClick={redirect}
      >
        or {settings.orText}
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
