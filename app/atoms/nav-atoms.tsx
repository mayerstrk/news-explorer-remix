import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useUsername } from '~/hooks/zustand/use-current-user'
import { usePopupToggle } from '~/hooks/zustand/use-popup'
import { Size, Route as RouteEnum } from '~/utils/enums'
import { Route } from '~/utils/string-unions'

export type NavBarColorScheme = 'white' | 'black'

export default function NavBarLayout({ children }: { children: ReactNode }) {
  return (
    <div className='absolute top-0 z-10 flex h-[var(--navbar-h)] w-full items-center justify-between border-b-2 border-gray-400 px-[16px] md:h-[var(--navbar-h-md)] xl:h-[var(--navbar-h-xl)]'>
      {children}
    </div>
  )
}

export function NavBarLogo() {
  const location = useLocation()
  const color: NavBarColorScheme =
    location.pathname === (RouteEnum.currentUserSaved as Route)
      ? 'black'
      : 'white'

  return (
    <h2
      className={`leading-[24px]md:text-[20px] h-fit text-center align-middle font-robotoSlab text-[16px] text-${color} font-bold`}
    >
      NewsExplorer
    </h2>
  )
}

export function NavBarControls({ children }: { children: ReactNode }) {
  return <div className='flex h-full items-center gap-x-[17px]'>{children}</div>
}

export function NavMenuButton() {
  const toggle = usePopupToggle('nav-menu')

  return (
    <button
      type='button'
      className="h-[25px] w-[24px] bg-[url('../public/images/menu.svg')] md:hidden"
      onClick={() => {
        toggle()
      }}
    />
  )
}

export function NavItemsLayout({ children }: { children: ReactNode }) {
  return (
    <nav className='h-full'>
      <ul className='flex h-full flex-col items-start gap-[22px] px-[16px] pb-[24px] pt-[16px] text-white md:flex-row md:items-center md:gap-[16px] md:p-[0px]'>
        {children}
      </ul>
    </nav>
  )
}

export function NavRouteItems({ signedIn }: { signedIn: boolean }) {
  const location = useLocation()
  const color: NavBarColorScheme =
    location.pathname === (RouteEnum.currentUserSaved as Route)
      ? 'black'
      : 'white'
  return (
    <>
      <NavItem to={'/home'} text='Home' color={color} />
      {signedIn && (
        <NavItem to={'/saved-articles'} text='Saved' color={color} />
      )}
    </>
  )
}

export function NavItem({
  to,
  text,
  color,
}: {
  to: Route
  text: string
  color: NavBarColorScheme
}) {
  const location = useLocation()
  const toggle = usePopupToggle('nav-menu')

  return (
    <li
      className={clsx(
        'box-border h-full text-center leading-[56px] md:w-[69px] md:leading-[var(--navbar-h-md)] xl:w-[60px] xl:leading-[var(--navbar-h-xl)]',
        {
          'hidden md:list-item md:border-b-[4px]': location.pathname === to,
          'text-white md:border-white': color === 'white',
          'text-black md:border-black': color == 'black',
        },
      )}
    >
      <Link onClick={toggle} to={to}>
        {text}
      </Link>
    </li>
  )
}

export function AuthButton({
  signedIn,
  size,
}: {
  signedIn: boolean
  size: Size
}) {
  const location = useLocation()
  const toggleSignInPopup = usePopupToggle('sign-in')
  const toggleSignOutPopup = usePopupToggle('sign-out')
  const currentUsername = useUsername()

  const color: NavBarColorScheme =
    location.pathname === RouteEnum.currentUserSaved ? 'black' : 'white'

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
