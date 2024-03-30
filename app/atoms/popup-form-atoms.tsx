import { useFetcher } from '@remix-run/react'
import clsx from 'clsx'
import { ChangeEvent, ReactNode } from 'react'
import { InputName } from '~/hooks/use-form'
import { usePopupRedirect } from '~/hooks/zustand/use-popup'
import { PopupName, Route } from '~/utils/string-unions'

export interface AuthPopupSettings {
  name: PopupName
  title: string
  inputs: {
    label: string
    htmlFor: string
    id: InputName
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
  action,
}: {
  children: ReactNode
  title: string
  action: Route
}) {
  const fetcher = useFetcher()
  return (
    <div className='fixed bottom-0 z-50 m-0 flex h-[90%] w-full flex-col items-center rounded-t-xl bg-white px-[16px] pb-[28px] pt-[16px] md:bottom-auto md:h-auto md:w-[430px] md:rounded-xl md:px-[36px] md:pt-[34px]'>
      <h2 className='mb-[18px] self-start text-2xl font-bold'>{title}</h2>
      <fetcher.Form method='POST' action={action} className='w-full'>
        {children}
      </fetcher.Form>
    </div>
  )
}

export function PopupFormControls({
  settings,
  isSubmitEnabled,
}: {
  settings: AuthPopupSettings['controls']
  isSubmitEnabled: boolean
}) {
  const redirect = usePopupRedirect(settings.redirectFrom, settings.redirectTo)
  console.log('isEnabled inner: ', isSubmitEnabled)

  return (
    <div className='flex w-full flex-col items-center'>
      <button
        className={clsx(
          'mb-[16px] w-full rounded-full bg-[#E6E8EB] py-[20px] font-bold text-[#B6BCBF]  hover:bg-[#347EFF] focus:outline-none active:bg-[#2A65CC]',
          { ' bg-blue-500 text-white': isSubmitEnabled },
        )}
        type='submit'
        disabled={!isSubmitEnabled}
      >
        {settings.mainText}
      </button>
      <button
        type='button'
        className='inline-block align-baseline text-sm text-blue-500 hover:text-blue-800'
        onClick={redirect}
      >
        <span className='text-black'>or</span> {settings.orText}
      </button>
    </div>
  )
}
export function FormFieldset({ children }: { children: ReactNode }) {
  return (
    <fieldset className='mb-[23px] flex w-full flex-col gap-[30px]'>
      {children}
    </fieldset>
  )
}

export function FormInput({
  label,
  htmlFor,
  id,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string
  htmlFor: string
  id: string
  type: string
  placeholder: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className='w-full'>
      <label
        className='mb-[8px] block w-full font-inter text-sm text-blue-500'
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className='w-full appearance-none rounded rounded-b-none border-b-[2px] p-0 pb-[10px] leading-tight text-gray-700 focus:outline-none'
        id={id}
        name={htmlFor}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}
