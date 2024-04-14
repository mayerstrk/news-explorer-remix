import { PopupLayout } from '~/atoms/popup-atoms'
import { AuthPopupForm, AuthPopupSettings } from '~/atoms/popup-form-atoms'
import { signupValidationSchema } from '~/hooks/use-form'
import { PopupName, Route } from '~/utils/enums'

export default function SignUpPopup() {
  const settings: AuthPopupSettings = {
    name: PopupName.signup,
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
      redirectFrom: PopupName.signup,
      redirectTo: PopupName.signin,
    },
  }

  return (
    <PopupLayout name={settings.name}>
      <AuthPopupForm
        action={Route.signup}
        settings={settings}
        validationSchema={signupValidationSchema}
      />
    </PopupLayout>
  )
}
