import { useFetcher } from '@remix-run/react'
import clsx from 'clsx'
import { ChangeEvent, ReactNode } from 'react'
import { InputName } from '~/hooks/use-form'
import { usePopupRedirect, usePopupToggle } from '~/hooks/zustand/use-popup'
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
  name,
  children,
  title,
  action,
}: {
  name: PopupName
  children: ReactNode
  title: string
  action: Route
}) {
  const toggle = usePopupToggle(name)
  const fetcher = useFetcher()
  return (
    <div
      className={clsx(
        'fixed bottom-0 z-50 md:bottom-auto', // positioning
        'flex flex-col items-center', // display
        'h-[94%] w-full md:h-auto md:w-[430px]', // dimensions
        'm-0', // margin and padding
        'rounded-t-xl md:rounded-xl', // effects
        'bg-white', // background
        'px-[16px] pb-[28px] pt-[16px] md:px-[36px] md:pt-[34px]', // margin and padding
      )}
    >
      <button
        className='absolute -right-[46px] -top-[46px] z-50 h-[40px] w-[40px] bg-[url("/images/close.svg")] bg-cover'
        onClick={toggle}
      ></button>
      <h2 className='mb-[18px] self-start text-2xl font-bold md:text-[24px]'>
        {title}
      </h2>
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

  return (
    <div className='flex w-full flex-col items-center'>
      <button
        className={clsx(
          'mb-[16px] w-full rounded-full bg-[#E6E8EB] py-[20px] font-bold text-[#B6BCBF]  focus:outline-none  md:text-[18px]',
          {
            ' bg-blue-500 text-white hover:bg-[#347EFF] active:bg-[#2A65CC]':
              isSubmitEnabled,
          },
        )}
        type='submit'
        disabled={!isSubmitEnabled}
      >
        {settings.mainText}
      </button>
      <button
        type='button'
        className='inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 md:text-[14px]'
        onClick={redirect}
      >
        <span className='text-black'>or</span> {settings.orText}
      </button>
    </div>
  )
}
export function FormFieldset({ children }: { children: ReactNode }) {
  return (
    <fieldset className='mb-[23px] flex w-full flex-col gap-[30px] md:mb-[39px] '>
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
    <div className='w-full md:h-[47px]'>
      <label
        className='mb-[8px] w-full font-inter text-sm text-blue-500 md:mb-0  md:text-[12px]'
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className={clsx(
          'w-full', // dimensions
          'appearance-none', // misc
          'rounded rounded-b-none border-b-[2px] focus:outline-none', // effects
          'pb-[10px] md:p-0', // margin and padding
          'font-inter leading-tight text-gray-700 md:text-[14px]', // typography
        )}
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
