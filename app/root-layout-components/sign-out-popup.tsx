import { PopupLayout } from '~/atoms/popup-atoms'
import { PopupFormLayout } from '~/atoms/popup-form-atoms'

export default function SignOutPopup() {
  return (
    <PopupLayout name='sign-out'>
      <PopupFormLayout action='/sign-out' name={'sign-out'} title='Sign Out'>
        <button type='submit'>Sign out</button>
      </PopupFormLayout>
    </PopupLayout>
  )
}
