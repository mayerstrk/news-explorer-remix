import { Size } from '~/utils/enums'
import NavBarLayout, {
  AuthButton,
  NavBarControls,
  NavBarLogo,
  NavItemsLayout,
  NavMenuButton,
  NavRouteItems,
} from '../atoms/nav-atoms'
import { useLocation } from '@remix-run/react'

export default function NavBarMain({ signedIn }: { signedIn: boolean }) {
  const location = useLocation()
  console.log(location.pathname.split('/')[1])
  const color = location.pathname.split('/')[1] === 'home' ? 'white' : 'black'

  return (
    <NavBarLayout>
      <NavBarLogo color={color} />
      <NavBarControls>
        <div className='box-border hidden h-full items-center gap-[34px] md:flex'>
          <NavItemsLayout>
            <NavRouteItems signedIn={signedIn} color={color} />
          </NavItemsLayout>
          <AuthButton signedIn={signedIn} size={Size.sm} color={color} />
        </div>
        <NavMenuButton color={color} />
      </NavBarControls>
    </NavBarLayout>
  )
}
