import { useFetcher, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { SomeZodObject } from 'zod'
import { InputName, signinValidationSchema, useForm } from '~/hooks/use-form'
import {
  useClosePopups,
  usePopupRedirect,
  usePopupToggle,
} from '~/hooks/zustand/use-popup'
import { SigninAction } from '~/routes/sign-in'
import { SignupAction } from '~/routes/sign-up'
import { PopupName, Route } from '~/utils/enums'

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
export function AuthPopupForm({
  settings,
  action,
  validationSchema,
}: {
  settings: AuthPopupSettings
  action: Route
  validationSchema: SomeZodObject
}) {
  signinValidationSchema
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true)
  const [submitButtonText, setSubmitButtontText] = useState(
    settings.controls.mainText,
  )
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const toggle = usePopupToggle(settings.name)
  const fetcher = useFetcher<SigninAction | SignupAction>()
  const closePopups = useClosePopups()
  const redirect = usePopupRedirect(
    settings.controls.redirectFrom,
    settings.controls.redirectTo,
  )
  const locationPathname = useLocation().pathname
  const { values, handleChange } = useForm()

  // Set submit error on ferch error
  useEffect(() => {
    if (fetcher.data?.success === false) {
      setFormErrors((f) => ({ ...f, submit: fetcher.data?.message || 'Error' }))
    }
  }, [fetcher.data, closePopups])

  // Set submit error to empty string when input values change
  useEffect(() => {
    setFormErrors((f) => ({ ...f, submit: '' }))
  }, [values])

  // Set formErrors on input value change
  useEffect(() => {
    const result = validationSchema.safeParse(values)

    if (result.success) {
      setIsSubmitEnabled(true)
      setFormErrors({})
      return
    }
    setIsSubmitEnabled(false)
    const newErrors = result.error.issues.reduce<typeof formErrors>(
      (acc, currentIssue) => {
        const path = currentIssue.path[0]
        if (!acc[path]) {
          acc[path] = currentIssue.message
        }
        return acc
      },
      {},
    )

    setFormErrors(newErrors)
  }, [values, validationSchema])

  // Set submit button text bsaed on fetcher state
  useEffect(() => {
    switch (fetcher.state) {
      case 'submitting':
        setSubmitButtontText('Loading...')
        break
      case 'idle':
        setSubmitButtontText(settings.controls.mainText)
        break
      default:
        break
    }
  }, [fetcher.state, closePopups, settings.controls.mainText])

  const thereAreErrors = Object.keys(formErrors).length > 0

  // close popup and reset errors on redirect
  useEffect(() => {
    closePopups()
    setFormErrors({})
  }, [locationPathname, closePopups])

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
      <h2 className='mb-[18px] self-start text-2xl font-bold md:text-[24px]'>
        {settings.title}
      </h2>
      <fetcher.Form method='POST' action={action} className='w-full'>
        <fieldset className='mb-[23px] flex w-full flex-col gap-[30px] md:mb-[39px] '>
          {settings.inputs.map((input) => (
            <div key={input.id} className='flex flex-col gap-5'>
              <FormInput
                error={formErrors[input.htmlFor] ? true : false}
                label={input.label}
                htmlFor={input.htmlFor}
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={values[input.id] ?? ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </fieldset>
        <div className='flex w-full flex-col items-center'>
          <em
            className={clsx(
              'mb-[20px] w-full rounded-2xl p-2 px-4 text-center md:text-sm',
              {
                'bg-gray-100 text-gray-400 ': !thereAreErrors,
                'border-[1px] border-red-400 bg-white text-red-400 ':
                  thereAreErrors,
              },
            )}
          >
            {Object.values(formErrors)[0] ||
              (Object.values(values).length === 0
                ? 'Please fill in required fields'
                : 'looks good!')}
          </em>
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
            {submitButtonText}
          </button>
          <button
            type='button'
            className='inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 md:text-[14px]'
            onClick={redirect}
          >
            <span className='text-black'>or</span> {settings.controls.orText}
          </button>
        </div>
      </fetcher.Form>
    </div>
  )
}

export function FormInput({
  error,
  label,
  htmlFor,
  id,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string
  error: boolean
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
        className='mb-[8px] w-full px-[10px] font-inter text-sm text-blue-500 md:mb-0  md:text-[12px]'
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        className={clsx(
          'w-full', // dimensions
          'appearance-none', // misc
          'rounded-lg border-b-[1px] focus:outline-none md:border-b-[2px]', // effects
          'p-[10px]', // margin and padding
          'font-inter text-gray-700 md:text-[14px]', // typography
          {
            'border-b-[1px] border-red-400': error,
          },
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
