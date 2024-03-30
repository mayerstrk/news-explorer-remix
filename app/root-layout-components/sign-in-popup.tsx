import { useEffect, useState } from 'react'
import { PopupLayout } from '~/atoms/popup-atoms'
import {
  FormInput,
  PopupFormControls,
  PopupFormLayout,
  AuthPopupSettings,
  FormFieldset,
} from '~/atoms/popup-form-atoms'
import { signinValidationSchema, useForm } from '~/hooks/use-form'

export default function SignIn() {
  const settings: AuthPopupSettings = {
    name: 'sign-in',
    title: 'Sign in',
    inputs: [
      {
        label: 'Email',
        htmlFor: 'email',
        id: 'email',
        type: 'email',
        placeholder: 'Enter email',
      },
      {
        label: 'Password',
        htmlFor: 'password',
        id: 'password',
        type: 'password',
        placeholder: 'Enter password',
      },
    ],
    controls: {
      mainText: 'Sign in',
      orText: 'Sign up',
      redirectFrom: 'sign-in',
      redirectTo: 'sign-up',
    },
  }

  const { values, handleChange } = useForm()
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)

  useEffect(() => {
    signinValidationSchema.isValid(values).then((valid) => {
      setIsSubmitEnabled(valid)
    })
  }, [values])

  return (
    <PopupLayout name={settings.name}>
      <PopupFormLayout action='/sign-in' title={settings.title}>
        <FormFieldset>
          {settings.inputs.map((input) => (
            <FormInput
              key={input.id}
              label={input.label}
              htmlFor={input.htmlFor}
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
              value={values[input.id] ?? ''}
              onChange={handleChange}
            />
          ))}
        </FormFieldset>
        <PopupFormControls
          settings={settings.controls}
          isSubmitEnabled={isSubmitEnabled}
        />
      </PopupFormLayout>
    </PopupLayout>
  )
}
