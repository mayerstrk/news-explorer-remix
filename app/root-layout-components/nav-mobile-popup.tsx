import { usePopupToggle } from '~/hooks/zustand/use-popup'
import NavBarLayout, {
  AuthButton,
  NavBarLogo,
  NavItemsLayout,
  NavRouteItems,
} from '../atoms/nav-atoms'
import { ReactNode } from 'react'
import { Size } from '~/utils/enums'
import { PopupLayout } from '../atoms/popup-atoms'

export function NavMobilePopup({ signedIn }: { signedIn: boolean }) {
  return (
    <NavMobilePopupLayout>
      <NavBarLayout>
        <NavBarLogo color='white' />
        <NavBarPopupCloseButton />
      </NavBarLayout>
      <NavItemsLayout>
        <NavRouteItems color='white' signedIn={signedIn} />
        <AuthButton signedIn={signedIn} color='white' size={Size.sm} />
      </NavItemsLayout>
    </NavMobilePopupLayout>
  )
}

export function NavMobilePopupLayout({ children }: { children: ReactNode }) {
  return (
    <PopupLayout name='nav-menu'>
      <div className='z-50 w-full bg-[#1A1B22] pt-[var(--navbar-h)] text-white '>
        {children}
      </div>
    </PopupLayout>
  )
}

export function NavBarPopupCloseButton() {
  const toggle = usePopupToggle('nav-menu')

  return (
    <button
      className='relative z-50 h-[24px] w-[24px]'
      type='button'
      onClick={toggle}
    >
      <div className='z-50 h-[24px] w-[24px] bg-[url("../public/images/close.svg")] bg-cover'></div>
    </button>
  )
}
