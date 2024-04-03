import { PopupLayout } from '~/atoms/popup-atoms'
import { AuthPopupForm, AuthPopupSettings } from '~/atoms/popup-form-atoms'
import { signupValidationSchema } from '~/hooks/use-form'

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

  return (
    <PopupLayout name={settings.name}>
      <AuthPopupForm
        action='/sign-up'
        settings={settings}
        validationSchema={signupValidationSchema}
      />
    </PopupLayout>
  )
}
