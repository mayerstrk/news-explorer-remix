import { PopupLayout } from '~/atoms/popup-atoms'
import { AuthPopupForm, AuthPopupSettings } from '~/atoms/popup-form-atoms'
import { signinValidationSchema } from '~/hooks/use-form'
import { PopupName, Route } from '~/utils/enums'

export default function SignIn() {
  const settings: AuthPopupSettings = {
    name: PopupName.signin,
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
      redirectFrom: PopupName.signin,
      redirectTo: PopupName.signup,
    },
  }

  return (
    <PopupLayout name={settings.name}>
      <AuthPopupForm
        settings={settings}
        action={Route.signin}
        validationSchema={signinValidationSchema}
      />
    </PopupLayout>
  )
}
