import { Size } from '~/utils/enums'
import NavBarLayout, {
  AuthButton,
  NavBarControls,
  NavBarLogo,
  NavItemsLayout,
  NavMenuButton,
  NavRouteItems,
} from './nav-atoms'

export default function NavBarMain({ signedIn }: { signedIn: boolean }) {
  return (
    <NavBarLayout>
      <NavBarLogo />
      <NavBarControls>
        <div className='box-border hidden h-full items-center gap-[34px] md:flex'>
          <NavItemsLayout>
            <NavRouteItems signedIn={signedIn} />
          </NavItemsLayout>
          <AuthButton signedIn={signedIn} size={Size.sm} />
        </div>
        <NavMenuButton />
      </NavBarControls>
    </NavBarLayout>
  )
}
