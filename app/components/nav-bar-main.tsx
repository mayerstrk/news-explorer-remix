import { Route as RouteEnum, Size } from '~/utils/enums'
import NavBarLayout, {
  AuthButton,
  NavBarControls,
  NavBarLogo,
  NavItemsLayout,
  NavMenuButton,
  NavRouteItems,
} from './nav-atoms'
import { useLocation } from '@remix-run/react'
import { Route } from '~/utils/string-unions'

export default function NavBarMain({ signedIn }: { signedIn: boolean }) {
  const location = useLocation()

  const colorScheme =
    location.pathname === (RouteEnum.currentUserSaved as Route)
      ? 'black'
      : 'white'
  return (
    <NavBarLayout>
      <NavBarLogo color={colorScheme} />
      <NavBarControls>
        <div className='box-border hidden h-full items-center gap-[34px] md:flex'>
          <NavItemsLayout>
            <NavRouteItems signedIn={signedIn} color={colorScheme} />
          </NavItemsLayout>
          <AuthButton signedIn={signedIn} size={Size.sm} color={colorScheme} />
        </div>
        <NavMenuButton />
      </NavBarControls>
    </NavBarLayout>
  )
}
