import { PopupLayout } from '~/atoms/popup-atoms'
import {
  FormInput,
  PopupFormControls,
  PopupFormLayout,
  AuthPopupSettings,
} from '~/atoms/popup-form-atoms'

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

  return (
    <PopupLayout name={settings.name}>
      <PopupFormLayout action='/sign-in' title={settings.title}>
        {settings.inputs.map((input) => (
          <FormInput
            key={input.id}
            label={input.label}
            htmlFor={input.htmlFor}
            id={input.id}
            type={input.type}
            placeholder={input.placeholder}
          />
        ))}
        <PopupFormControls settings={settings.controls} />
      </PopupFormLayout>
    </PopupLayout>
  )
}
