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
      <div className='mx-auto flex h-full w-full max-w-[1232px] items-center justify-between self-center'>
        <NavBarLogo color={color} />
        <NavBarControls>
          <div className='box-border hidden h-full items-center md:flex md:gap-[16px] xl:gap-[38px]'>
            <NavItemsLayout>
              <NavRouteItems signedIn={signedIn} color={color} />
            </NavItemsLayout>
            <AuthButton signedIn={signedIn} size={Size.sm} color={color} />
          </div>
          <NavMenuButton color={color} />
        </NavBarControls>
      </div>
    </NavBarLayout>
  )
}
