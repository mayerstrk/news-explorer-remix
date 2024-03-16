import { json, useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { useAppNavigate } from '~/hooks/remix'
import { usePopupToggle, usePopupVisibility } from '~/hooks/zustand/usePopup'
import { signOut } from '~/services/users'
import { Path } from '~/utils/enums'

export default function NavBar({ children }: { children: ReactNode }) {
  return (
    <div className='top1 absolute z-10 flex h-[var(--navbar-h)] w-full items-center justify-between border-b-2 border-gray-400 px-[16px] md:h-[var(--navbar-h-md)] xl:h-[var(--navbar-h-xl)]'>
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
  return (
    <button
      type='button'
      className="h-[25px] w-[24px] bg-[url('../public/images/menu.svg')] md:hidden"
      onClick={() => {
        console.log('clicked')
        console.log('before: ', isVisible)
        toggle()
        console.log('after: ', isVisible)
      }}
    />
  )
}

export function NavMenuMobilePopup({ children }: { children: ReactNode }) {
  const isOpen = usePopupVisibility('nav-menu')
  const toggle = usePopupToggle('nav-menu')
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        toggle()
      }
    },
    [toggle],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  return (
    <>
      <div
        className={clsx(
          'absolute inset-0 h-svh bg-black opacity-50 md:hidden',

          {
            'flex-col': isOpen,
            hidden: !isOpen,
          },
        )}
      ></div>
      <div
        ref={overlayRef}
        className={clsx(
          'absolute left-0 right-0 top-1 w-full bg-[#1A1B22] pt-[var(--navbar-h)] text-white ',
          {
            'flex-col': isOpen,
            hidden: !isOpen,
          },
        )}
      >
        {children}
      </div>
    </>
  )
}

export function NavItems({ signedIn }: { signedIn: boolean }) {
  const location = useLocation()
  return (
    <nav>
      <ul className='flex h-full flex-col text-white md:flex-row md:items-center'>
        <li
          className={clsx(
            'h-full text-center md:w-[69px] md:leading-[var(--navbar-h-md)] xl:w-[60px] xl:leading-[var(--navbar-h-xl)]',
            {
              'border-white md:border-b-[4px]': location.pathname == '/',
            },
          )}
        >
          Home
        </li>
        {signedIn && (
          <li
            className={clsx(
              'h-full text-center md:w-[161px] md:leading-[var(--navbar-h-md)] xl:w-[178px] xl:leading-[var(--navbar-h-xl)]',
              {
                'border-white md:border-b-[4px]':
                  location.pathname == Path.currentUserSaved,
              },
            )}
          >
            Saved articles
          </li>
        )}
      </ul>
    </nav>
  )
}

export function AuthButton({ signedIn }: { signedIn: boolean }) {
  const navigate = useAppNavigate()

  const handleClick = async () => {
    if (signedIn) {
      const { success, response } = await signOut()
      if (!success) {
        throw new Error(response.message, { cause: response })
      }
      navigate('/home/logout')
    }
  }

  return (
    <button
      className='hidden h-[57px]  w-[56px] rounded-full border-[1px] border-white text-[18px] font-medium text-white md:block md:h-[40px] md:w-[152px] md:text-[16px] xl:h-[48px] xl:w-[176px]'
      onClick={handleClick}
    >
      {signedIn === false ? 'Sign in' : 'Log out'}
    </button>
  )
}
