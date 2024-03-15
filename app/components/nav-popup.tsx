import clsx from 'clsx'
import { NavMenu } from './nav-bar'
import { usePopup } from '~/hooks/usePopup'
import { PopupName } from '~/stores/usePopupStore'

export function NavMobileMenu() {
  const { isOpen } = usePopup(PopupName.navMenu)
  return (
    <div
      className={clsx(
        'absolute top-0 w-full bg-[#1A1B22] pt-[var(--navbar-h)] text-white md:hidden',
        {
          'flex-col': isOpen,
          hidden: !isOpen,
        },
      )}
    >
      <NavMenu />
    </div>
  )
}
