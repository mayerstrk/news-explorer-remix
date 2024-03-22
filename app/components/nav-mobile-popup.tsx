import { usePopupToggle } from '~/hooks/zustand/use-popup'
import NavBarLayout, {
  AuthButton,
  NavBarLogo,
  NavItemsLayout,
  NavRouteItems,
} from './nav-atoms'
import { ReactNode } from 'react'
import { Size } from '~/utils/enums'
import { PopupLayout } from './popup-atoms'

export function NavMobilePopup({ signedIn }: { signedIn: boolean }) {
  return (
    <NavMobilePopupLayout>
      <NavBarLayout>
        <NavBarLogo color='white' />
        <NavBarPopupCloseButton />
      </NavBarLayout>
      <NavItemsLayout>
        <NavRouteItems signedIn={signedIn} color='white' />
        <AuthButton signedIn={signedIn} size={Size.sm} color='white' />
      </NavItemsLayout>
    </NavMobilePopupLayout>
  )
}

export function NavMobilePopupLayout({ children }: { children: ReactNode }) {
  return (
    <PopupLayout name='nav-menu'>
      <div className=' z-50 bg-[#1A1B22] pt-[var(--navbar-h)] text-white '>
        {children}
      </div>
    </PopupLayout>
  )
}

export function NavBarPopupCloseButton() {
  const toggle = usePopupToggle('nav-menu')

  return (
    <button
      className='relative h-[24px] w-[24px]'
      type='button'
      onClick={toggle}
    >
      <div className='h-[24px] w-[24px] bg-[url("../public/images/close.svg")] bg-cover'></div>
    </button>
  )
}
