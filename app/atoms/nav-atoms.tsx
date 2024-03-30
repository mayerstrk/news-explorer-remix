import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useUsername } from '~/hooks/zustand/use-current-user'
import { usePopupToggle } from '~/hooks/zustand/use-popup'
import { Size } from '~/utils/enums'
import { sameFirstSegment } from '~/utils/helpers'

export type NavBarColorScheme = 'white' | 'black'

export default function NavBarLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx(
        'absolute top-0 z-10', // positioning
        'flex items-center justify-between', // display
        'h-[var(--navbar-h)] w-full ', // dimensions
        'px-[16px] md:px-[40px]', // margin and padding
        'border-b-2 border-gray-400', // effects
        'md:h-[var(--navbar-h-md)]', // md
        'xl:h-[var(--navbar-h-xl)]', // xl
      )}
    >
      {children}
    </div>
  )
}

export function NavBarLogo({ color }: { color: NavBarColorScheme }) {
  return (
    <h2
      className={clsx(
        'h-fit', // dimensions
        'text-center align-middle', // display
        'font-robotoSlab text-[16px] font-bold leading-[24px]', // typography
        `text-${color}`, // typography (dynamic)
        'md:text-[20px] md:leading-[24px]', // md
        'xl:text-[20px] xl:leading-[24px]', // xl
      )}
    >
      NewsExplorer
    </h2>
  )
}

export function NavBarControls({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-full items-center gap-x-[17px] text-[18px] leading-[56px] md:text-[16px] md:leading-[24px] xl:text-[18px] xl:leading-[25px]'>
      {children}
    </div>
  )
}

export function NavMenuButton({ color }: { color: NavBarColorScheme }) {
  const toggle = usePopupToggle('nav-menu')

  return (
    <button
      type='button'
      className={clsx(
        'h-[25px] w-[25px]', // dimensions
        'md:hidden', // md
        color === 'white' && "bg-[url('/images/menu.svg')]", // misc
        color === 'black' && "bg-[url('/images/menu-black.svg')]", // misc
      )}
      onClick={() => {
        toggle()
      }}
    />
  )
}

export function NavItemsLayout({ children }: { children: React.ReactNode }) {
  return (
    <nav className='flex h-full items-center justify-center'>
      <ul className='flex w-full flex-col items-center gap-[22px] px-[16px] pb-[24px] pt-[16px] text-white md:h-full md:flex-row md:gap-[16px] md:p-0'>
        {children}
      </ul>
    </nav>
  )
}

export function NavRouteItems({
  signedIn,
  color,
}: {
  signedIn: boolean
  color: string
}) {
  return (
    <>
      <NavItem to={'/home'} text='Home' color={color} />
      {signedIn && (
        <NavItem
          to={'/saved-articles?amount=6'}
          text='Saved Articles'
          color={color}
        />
      )}
    </>
  )
}

export function NavItem({
  to,
  text,
  color,
}: {
  to: string
  text: string
  color: string
}) {
  const location = useLocation()
  const toggle = usePopupToggle('nav-menu')

  return (
    <div
      className={clsx(
        'box-content flex h-full items-center justify-center px-[32px] text-center',
        {
          'text-white md:border-white': color === 'white',
          'text-black md:border-black': color === 'black',
          'md:border-b-[4px]': sameFirstSegment(location.pathname, to),
        },
      )}
    >
      <li className='flex h-full items-center justify-center'>
        <Link onClick={toggle} to={to} prefetch='render'>
          {text}
        </Link>
      </li>
    </div>
  )
}

export function AuthButton({
  signedIn,
  size,
  color,
}: {
  signedIn: boolean
  size: Size
  color: NavBarColorScheme
}) {
  const toggleSignInPopup = usePopupToggle('sign-in')
  const toggleSignOutPopup = usePopupToggle('sign-out')
  const currentUsername = useUsername()

  const handleClick = async () => {
    if (signedIn) {
      toggleSignOutPopup()
    } else {
      toggleSignInPopup()
    }
  }

  return (
    <button
      className={clsx(
        'mx-auto flex h-[56px] w-full items-center justify-center gap-[13px] rounded-full border-[1px] text-[18px] font-[18px] leading-[24px] md:h-[40px] md:w-[152px] md:text-[16px] xl:h-[48px] xl:w-[176px]',
        {
          hidden: size !== Size.sm,
          'border-white text-white': color === 'white',
          'border-black text-black': color === 'black',
        },
      )}
      onClick={handleClick}
    >
      {signedIn === false ? 'Sign in' : currentUsername}
      <div
        className={clsx(
          'inline-block h-[18px] w-[18px] bg-[url("/images/logout-white.svg")] bg-contain md:h-[16px] md:w-[16px] xl:h-[18px] xl:w-[18px]',
          {
            'bg-[url("/images/logout.svg")]': color === 'black',
          },
        )}
      ></div>
    </button>
  )
}
