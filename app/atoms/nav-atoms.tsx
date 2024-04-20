import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { usePopupToggle } from '~/hooks/zustand/use-popup'
import { PopupName, Size } from '~/utils/enums'
import { sameFirstSegment } from '~/utils/helpers'

export type NavBarColorScheme = 'white' | 'black'

export default function NavBarLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={clsx(
        'absolute top-0 z-10', // positioning
        'box-border flex items-center justify-between', // display
        'h-[var(--navbar-h)] w-full ', // dimensions
        'px-[16px] md:px-[40px] md:pt-[4px]', // margin and padding
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
    <div
      className={clsx(
        'flex h-full items-center ', // display
        'text-[18px] leading-[56px] md:text-[16px] md:leading-[24px] xl:text-[18px] xl:leading-[25px]', // typography
      )}
    >
      {children}
    </div>
  )
}

export function NavMenuButton({ color }: { color: NavBarColorScheme }) {
  const toggle = usePopupToggle(PopupName.navMenu)

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
      <ul
        className={clsx(
          'flex w-full flex-col items-center justify-start md:h-full md:flex-row ', // display
          'gap-[22px] px-[16px] pb-[24px] pt-[16px] md:gap-[16px] md:p-0 xl:gap-[38px]', // spacing
          'text-white', // typography
        )}
      >
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
          text='Saved articles'
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
  const toggle = usePopupToggle(PopupName.navMenu)

  return (
    <div
      className={clsx(
        'box-content', // misc
        'flex items-center justify-start md:justify-center', // display
        'h-full w-full ', // dimensions
        'text-[18px] font-medium leading-[56px] md:text-[16px] md:leading-[24px] xl:text-[18px]', // typography
        {
          'text-white md:border-white': color === 'white',
          'text-black md:border-black': color === 'black',
          'md:border-b-[4px] xl:pt-[5px]': sameFirstSegment(
            location.pathname,
            to,
          ),
          'md:w-[60px] xl:w-[70px]': to === '/home',
          'md:w-[160px] xl:w-[170px]': to !== '/home',
        },
      )}
    >
      <li className='flex h-full items-center justify-start text-start'>
        <Link
          onClick={toggle}
          to={to}
          prefetch='render'
          state={{ fromNav: true }}
        >
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
  username,
}: {
  signedIn: boolean
  size: Size
  color: NavBarColorScheme
  username: string | null
}) {
  const toggleSignInPopup = usePopupToggle(PopupName.signin)
  const toggleConfirmPopup = usePopupToggle(PopupName.confirm)

  const handleClick = async () => {
    if (signedIn) {
      toggleConfirmPopup()
    } else {
      toggleSignInPopup()
    }
  }

  return (
    <button
      className={clsx(
        'mx-auto', // spacing
        'flex items-center justify-center', // display
        'h-[56px] w-full md:h-[40px] xl:h-[48px]', // dimensions
        'rounded-full border-[1px]', // effects
        'text-[18px] font-[18px] leading-[24px] md:text-[16px] md:font-medium xl:text-[18px]', // typography
        {
          hidden: size !== Size.sm,
          'border-white text-white': color === 'white',
          'border-black text-black': color === 'black',
          'pl-0 md:w-[152px] md:pl-0 xl:w-[176px] xl:pl-0 ': signedIn !== true,
          'md:w-fit md:pl-[15px] xl:pl-[19px]': signedIn === true,
        },
      )}
      onClick={handleClick}
    >
      {signedIn === false ? 'Sign in' : username}
      {signedIn && (
        <div
          className={clsx(
            'ml-[5px] h-[18px] w-[18px] bg-[url("/images/logout-white.svg")] bg-contain md:mx-[13px] md:h-[24px] md:w-[24px] xl:h-[24px] xl:w-[24px]',
            {
              'bg-[url("/images/logout.svg")]': color === 'black',
            },
          )}
        ></div>
      )}
    </button>
  )
}
