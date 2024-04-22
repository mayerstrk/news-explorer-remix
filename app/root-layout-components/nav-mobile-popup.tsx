import { usePopupToggle } from '~/hooks/zustand/use-popup'
import NavBarLayout, {
  AuthButton,
  NavBarLogo,
  NavItemsLayout,
  NavRouteItems,
} from '../atoms/nav-atoms'
import { ReactNode } from 'react'
import { PopupName, Size } from '~/utils/enums'
import { PopupLayout } from '../atoms/popup-atoms'

export function NavMobilePopup({
  signedIn,
  username,
}: {
  signedIn: boolean
  username: string
}) {
  return (
    <NavMobilePopupLayout>
      <NavBarLayout>
        <NavBarLogo color='white' />
        <NavBarPopupCloseButton />
      </NavBarLayout>
      <NavItemsLayout>
        <NavRouteItems color='white' signedIn={signedIn} />
        <AuthButton
          signedIn={signedIn}
          color='white'
          size={Size.sm}
          username={username}
        />
      </NavItemsLayout>
    </NavMobilePopupLayout>
  )
}

export function NavMobilePopupLayout({ children }: { children: ReactNode }) {
  return (
    <PopupLayout name={PopupName.navMenu}>
      <div className='z-50 w-full bg-indigo-500 pt-[var(--navbar-h)] text-white '>
        {children}
      </div>
    </PopupLayout>
  )
}

export function NavBarPopupCloseButton() {
  const toggle = usePopupToggle(PopupName.navMenu)

  return (
    <button
      className='relative h-[24px] w-[24px]'
      type='button'
      onClick={toggle}
    >
      <div className='h-[24px] w-[24px] bg-[url("/images/close.svg")] bg-cover'></div>
    </button>
  )
}
