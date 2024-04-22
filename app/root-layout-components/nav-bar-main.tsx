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
    <nav className='absolute top-0 z-10 flex h-16 w-full items-stretch justify-between border-b-2 border-gray-400 px-4 md:h-20 xl:h-24'>
      <div
        className={`flex h-full items-center px-4 text-center font-robotoSlab text-lg font-bold leading-6 text-${color} md:text-xl md:leading-7 xl:text-2xl xl:leading-8`}
      >
        NewsExplorer
      </div>
      <div className='flex h-full justify-end'>
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
        <button
          className={`mx-4 flex h-full items-center justify-center rounded-full border-2 text-base font-medium leading-6 md:text-lg md:leading-7 xl:text-xl ${color === 'white' ? 'border-white text-white' : 'border-black text-black'} px-4 md:w-auto xl:w-auto`}
          onClick={handleAuthButtonClick}
          style={{ minWidth: '100px' }}
        >
          {signedIn ? username : 'Sign in'}
          {signedIn && (
            <img
              src={
                color === 'white'
                  ? '/images/logout-white.svg'
                  : '/images/logout.svg'
              }
              alt='Log out'
              className='ml-2 h-6 w-6'
            />
          )}
        </button>
        <button
          type='button'
          className={`h-6 w-6 md:hidden ${color === 'white' ? "bg-[url('/images/menu.svg')]" : "bg-[url('/images/menu-black.svg')]"} bg-center bg-no-repeat`}
          onClick={toggleMobileNavMenu}
        />
      </div>
    </nav>
  )
}
