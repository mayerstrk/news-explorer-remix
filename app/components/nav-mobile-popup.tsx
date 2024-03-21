import { usePopupToggle, usePopupVisibility } from '~/hooks/zustand/use-popup'
import NavBarLayout, {
  AuthButton,
  NavBarLogo,
  NavItemsLayout,
  NavRouteItems,
} from './nav-atoms'
import { ReactNode, useEffect, useState } from 'react'
import { Size } from '~/utils/enums'
import { PopupLayout } from './popup-atoms'

export function NavMobilePopup({ signedIn }: { signedIn: boolean }) {
  const [visible, setIsVisible] = useState(false)
  const isOpen = usePopupVisibility('nav-menu')

  console.log('nav-popup rendered')
  console.log('after render: ', visible)

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen, setIsVisible])

  return visible ? (
    <NavMobilePopupLayout>
      <NavBarLayout>
        <NavBarLogo />
        <NavBarPopupCloseButton />
      </NavBarLayout>
      <NavItemsLayout>
        <NavRouteItems signedIn={signedIn} />
        <AuthButton signedIn={signedIn} size={Size.sm} />
      </NavItemsLayout>
    </NavMobilePopupLayout>
  ) : (
    <></>
  )
}

export function NavMobilePopupLayout({ children }: { children: ReactNode }) {
  return (
    <PopupLayout name='nav-menu'>
      <div className='absolute left-0 right-0 top-0 z-30 w-full bg-[#1A1B22] pt-[var(--navbar-h)] text-white '>
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
