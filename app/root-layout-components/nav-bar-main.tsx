import { Size } from '~/utils/enums'
import NavBarLayout, {
  AuthButton,
  NavBarColorScheme,
  NavBarControls,
  NavBarLogo,
  NavItemsLayout,
  NavMenuButton,
  NavRouteItems,
} from '../atoms/nav-atoms'

export default function NavBarMain({
  signedIn,
  username,
  color,
}: {
  color: NavBarColorScheme
  signedIn: boolean
  username: string | null
}) {
  return (
    <NavBarLayout>
      <div className='mx-auto flex h-full w-full max-w-[1232px] items-center justify-between self-center'>
        <NavBarLogo color={color} />
        <NavBarControls>
          <div className='box-border hidden h-full items-center md:flex md:gap-[16px] xl:gap-[38px]'>
            <NavItemsLayout>
              <NavRouteItems signedIn={signedIn} color={color} />
            </NavItemsLayout>
            <AuthButton
              signedIn={signedIn}
              size={Size.sm}
              color={color}
              username={username || ''}
            />
          </div>
          <NavMenuButton color={color} />
        </NavBarControls>
      </div>
    </NavBarLayout>
  )
}
