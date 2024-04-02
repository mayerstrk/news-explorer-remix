import { useEffect, useState } from 'react'
import { PopupLayout } from '~/atoms/popup-atoms'
import {
  FormInput,
  PopupFormControls,
  PopupFormLayout,
  AuthPopupSettings,
  FormFieldset,
} from '~/atoms/popup-form-atoms'
import { signupValidationSchema, useForm } from '~/hooks/use-form'

export default function SignUpPopup() {
  const settings: AuthPopupSettings = {
    name: 'sign-up',
    title: 'Sign up',
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
      {
        label: 'Username',
        htmlFor: 'username',
        id: 'username',
        type: 'text',
        placeholder: 'Enter your username',
      },
    ],
    controls: {
      mainText: 'Sign up',
      orText: 'Sign in',
      redirectFrom: 'sign-up',
      redirectTo: 'sign-in',
    },
  }
  const { values, handleChange } = useForm()
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)

  useEffect(() => {
    setIsSubmitEnabled(signupValidationSchema.safeParse(values).success)
  }, [values])

  return (
    <PopupLayout name={settings.name}>
      <PopupFormLayout
        name={settings.name}
        action='/sign-up'
        title={settings.title}
      >
        <FormFieldset>
          {settings.inputs.map((input) => (
            <FormInput
              key={input.id}
              value={values[input.id] ?? ''}
              onChange={handleChange}
              label={input.label}
              htmlFor={input.htmlFor}
              id={input.id}
              type={input.type}
              placeholder={input.placeholder}
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
