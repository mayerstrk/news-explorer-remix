import { useLocation, useNavigate } from '@remix-run/react'
import clsx from 'clsx'
import { usePopup } from '~/hooks/usePopup'
import { PopupName } from '~/stores/usePopupStore'
import { Paths } from '~/utils/enums'

export const enum MenuType {
  sm,
  md,
}

export default function NavBar() {
  return (
    <div className='absolute top-0 z-10 flex h-[var(--navbar-h)] w-full items-center justify-between border-b-2 border-gray-400 px-[16px] md:h-[var(--navbar-h-md)] xl:h-[var(--navbar-h-xl)]'>
      <h1 className='h-fit text-center align-middle font-robotoSlab text-[16px] font-bold leading-[24px] text-white md:text-[20px]'>
        NewsExplorer
      </h1>
      <NavBarControls />
    </div>
  )
}

function NavBarControls() {
  const { toggle } = usePopup(PopupName.navMenu)
  return (
    <div className='flex h-full items-center gap-x-[16px]'>
      <div className='hidden h-full md:flex'>
        <NavMenu />
      </div>
      <button
        type='button'
        className="h-[24px] w-[24px] bg-[url('../public/images/menu.svg')] md:hidden"
        onClick={toggle}
      />

      <SessionButton isSignedIn />
    </div>
  )
}

export function NavMenu() {
  const location = useLocation()
  return (
    <nav>
      <ul className='flex h-full flex-col text-white md:flex-row md:items-center'>
        <li
          className={clsx(
            'h-full text-center md:w-[68px] md:leading-[var(--navbar-h-md)] xl:w-[60px] xl:leading-[var(--navbar-h-xl)]',
            {
              'border-b-[3px] border-white': location.pathname == Paths.home,
            },
          )}
        >
          Home
        </li>
        <li
          className={clsx(
            'h-full text-center md:w-[160px] md:leading-[var(--navbar-h-md)] xl:w-[178px] xl:leading-[var(--navbar-h-xl)]',
            {
              'border-b-[3px] border-white':
                location.pathname == Paths.currentUserSaved,
            },
          )}
        >
          Saved articles
        </li>
      </ul>
    </nav>
  )
}

function SessionButton({ isSignedIn }: { isSignedIn: boolean }) {
  const navigate = useNavigate()
  return (
    <button
      className='hidden h-[56px]  w-[56px] rounded-full border-[1px] border-white text-[18px] font-medium text-white md:block md:h-[40px] md:w-[152px] md:text-[16px] xl:h-[48px] xl:w-[176px]'
      onClick={() => navigate('/sign-in')}
    >
      {signed ? 'Log out' : 'Log in'}
    </button>
  )
}
