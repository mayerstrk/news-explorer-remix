import { NavLink } from '@remix-run/react'
import { usePopupToggle } from '~/hooks/zustand/use-popup'
import { PopupName } from '~/utils/enums'

interface NavBarMainProps {
  signedIn: boolean
  username: string | null
  color: string
}
export default function NavBarMain({
  signedIn,
  username,
  color,
}: NavBarMainProps) {
  const toggleMobileNavMenu = usePopupToggle(PopupName.navMenu)
  const toggleSignInModal = usePopupToggle(PopupName.signin)
  const toggleConfirmModal = usePopupToggle(PopupName.confirm)

  const navItemBaseStyle = `flex h-full items-center justify-center text-base no-underline whitespace-nowrap`

  const getNavItemStyle = (isActive: boolean) =>
    isActive
      ? `border-b-2 border-${color} text-${color}`
      : `hover:text-${color} text-${color} opacity-70`

  const handleAuthButtonClick = () => {
    if (signedIn) {
      toggleConfirmModal()
    } else {
      toggleSignInModal()
    }
  }

  return (
    <nav className='z-10 flex h-16 w-full items-stretch justify-between border-b-2 border-black bg-transparent px-4 md:h-20 xl:h-24'>
      <div
        className={`flex h-full items-center px-4 text-center font-robotoSlab text-lg font-bold leading-6 text-black md:text-xl md:leading-7 xl:text-2xl xl:leading-8`}
      >
        NewsExplorer
      </div>
      <div className='hidden h-full md:flex'>
        <NavLink
          to='/home'
          className={({ isActive }) =>
            `${navItemBaseStyle} px-4 ${getNavItemStyle(isActive)}`
          }
          end
        >
          Home
        </NavLink>
        {signedIn && (
          <NavLink
            to='/saved-articles'
            className={({ isActive }) =>
              `${navItemBaseStyle} px-4 ${getNavItemStyle(isActive)}`
            }
          >
            Saved articles
          </NavLink>
        )}
        <div className='h-full py-6'>
          <button
            className={`mx-4 flex h-full items-center justify-center rounded-full border-2 border-black px-4 text-base font-medium leading-6 text-black md:w-auto md:leading-7 xl:w-auto`}
            onClick={handleAuthButtonClick}
            style={{ minWidth: '100px' }}
          >
            {signedIn ? username : 'Sign in'}
            {signedIn && (
              <img
                src='/images/logout.svg'
                alt='Log out'
                className='ml-2 h-6 w-6'
              />
            )}
          </button>
        </div>
      </div>
      <div className='flex h-full items-center md:hidden'>
        <button
          type='button'
          className={`size-8 bg-[url('/images/menu.svg')] bg-cover bg-center`}
          onClick={toggleMobileNavMenu}
        />
      </div>
    </nav>
  )
}
