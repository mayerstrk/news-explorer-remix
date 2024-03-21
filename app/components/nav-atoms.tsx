import { Link, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { ReactNode, useEffect } from 'react'
import { useAppNavigate } from '~/hooks/remix'
import { usePopupToggle, usePopupVisibility } from '~/hooks/zustand/use-popup'
import { signOut } from '~/services/users'
import { Size } from '~/utils/enums'
import { Route } from '~/utils/string-unions'

export default function NavBarLayout({ children }: { children: ReactNode }) {
  return (
    <div className='absolute top-0 z-10 flex h-[var(--navbar-h)] w-full items-center justify-between border-b-2 border-gray-400 px-[16px] md:h-[var(--navbar-h-md)] xl:h-[var(--navbar-h-xl)]'>
      {children}
    </div>
  )
}

export function NavBarLogo() {
  return (
    <h2 className='h-fit text-center align-middle font-robotoSlab text-[16px] font-bold leading-[24px] text-white md:text-[20px]'>
      NewsExplorer
    </h2>
  )
}

export function NavBarControls({ children }: { children: ReactNode }) {
  return <div className='flex h-full items-center gap-x-[17px]'>{children}</div>
}

export function NavMenuButton() {
  const toggle = usePopupToggle('nav-menu')
  const isVisible = usePopupVisibility('nav-menu')

  useEffect(() => {
    console.log('isVisible: ', isVisible)
  }, [isVisible])

  return (
    <button
      type='button'
      className="h-[25px] w-[24px] bg-[url('../public/images/menu.svg')] md:hidden"
      onClick={() => {
        console.log('clicked')
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
  console.log('signd in: ', signedIn)
  return (
    <>
      <NavItem to={'/home'} text='Home' />
      {signedIn && <NavItem to={'/saved-articles'} text='Saved' />}
    </>
  )
}

export function NavItem({ to, text }: { to: Route; text: string }) {
  const location = useLocation()
  return (
    <li
      className={clsx(
        'box-content h-full text-center leading-[56px] md:w-[69px] md:leading-[var(--navbar-h-md)] xl:w-[60px] xl:leading-[var(--navbar-h-xl)]',
        {
          'hidden md:list-item md:border-b-[4px] md:border-white':
            location.pathname === to,
        },
      )}
    >
      <Link to={to}>{text}</Link>
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
  const navigate = useAppNavigate()

  const handleClick = async () => {
    if (signedIn) {
      // const { success, response } = await signOut()
      // if (!success) {
      //   throw new Error(response.message, { cause: response })
      // }
      navigate('/home/logout')
    }
  }

  return (
    <button
      className={clsx(
        'mx-auto h-[56px] w-full  rounded-full border-[1px] border-white text-[18px] font-[18px] font-medium leading-[24px] text-white  md:h-[40px] md:w-[152px] md:text-[16px] xl:h-[48px] xl:w-[176px]',
        {
          hidden: size !== Size.sm,
        },
      )}
      onClick={handleClick}
    >
      {signedIn === false ? 'Sign in' : 'Log out'}
    </button>
  )
}
