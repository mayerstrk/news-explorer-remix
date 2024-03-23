import { Route as RouteEnum, Size } from '~/utils/enums'
import NavBarLayout, {
  AuthButton,
  NavBarColorScheme,
  NavBarControls,
  NavBarLogo,
  NavItemsLayout,
  NavMenuButton,
  NavRouteItems,
} from '../atoms/nav-atoms'
import { useLocation } from '@remix-run/react'
import { Route } from '~/utils/string-unions'
import { useEffect, useState } from 'react'

export default function NavBarMain({ signedIn }: { signedIn: boolean }) {
  console.log('nav bar rendered')
  const location = useLocation()
  const [colorScheme, setColorScheme] = useState<NavBarColorScheme>('white')

  useEffect(() => {
    setColorScheme(
      location.pathname === (RouteEnum.currentUserSaved as Route)
        ? 'black'
        : 'white',
    )
  }, [location])

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
