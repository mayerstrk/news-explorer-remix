import { PopupLayout } from '~/atoms/popup-atoms'
import {
  FormInput,
  PopupFormControls,
  PopupFormLayout,
  authPopupSettings,
} from '~/atoms/popup-form-atoms'

export default function SignUpPopup() {
  const settings: authPopupSettings = {
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

  return (
    <PopupLayout name={settings.name}>
      <PopupFormLayout title={settings.title}>
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
