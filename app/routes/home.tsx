import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from '@vercel/remix'
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from '@remix-run/react'
import { destroySession } from '~/session.server'
import { Loading } from './home.search.$searchTerm'
import { AuthState, serverAuthPublicRoute } from '~/services.server/db-api/auth'
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { usePopupToggle } from '~/hooks/zustand/use-popup'
import { PopupName } from '~/utils/enums'
import CollisionsAnimation from '../d3/header-collisions'

type LoaderReturnType = Promise<
  TypedResponse<
    | {
        searchTerm: string
        signedIn: true
        username: string
      }
    | { searchTerm: string; signedIn: false; username: null }
  >
>
export const loader = async ({
  request,
  params,
}: LoaderFunctionArgs): LoaderReturnType => {
  const { session, authState, response } = await serverAuthPublicRoute(request)

  if (authState === AuthState.notSignedIn) {
    return json(
      {
        searchTerm: params.searchTerm || '',
        signedIn: false,
        username: null,
      },
      { status: 200 },
    )
  }

  if (authState === AuthState.tokenValidationFailed) {
    return redirect('/', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  return json(
    {
      searchTerm: params.searchTerm || '',
      signedIn: true,
      username: response.data.name,
    },
    { status: 200 },
  )
}

export default function Home() {
  const { searchTerm, signedIn, username } = useLoaderData<typeof loader>() // Assuming this is the initial search term from the loader

  const [searchValue, setSearchValue] = useState(searchTerm || '')
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isAboutMeExpanded, setIsAboutMeExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const navigation = useNavigation()

  useEffect(() => {
    setIsSearchActive(searchValue !== '' && searchValue !== searchTerm)
  }, [searchValue, searchTerm])

  useEffect(() => {
    if (searchValue === '' && location.state?.fromSearch === true) {
      navigate('/home', {
        preventScrollReset: true,
        state: { fromSearch: true },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, navigate])

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue && searchValue !== searchTerm) {
      navigate('/home/search/' + encodeURIComponent(searchValue), {
        state: { fromSearch: true },
        preventScrollReset: true,
      })
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const scrollToInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const toggleExpansion = () => {
    setIsAboutMeExpanded(!isAboutMeExpanded)
  }

  const toggleMobileNavMenu = usePopupToggle(PopupName.navMenu)
  const toggleSignInModal = usePopupToggle(PopupName.signin)
  const toggleConfirmModal = usePopupToggle(PopupName.confirm)

  const navItemBaseStyle = `flex h-full items-center justify-center text-base no-underline whitespace-nowrap`

  const getNavItemStyle = (isActive: boolean) =>
    isActive
      ? `border-b-2 border-white text-white`
      : `hover:text-white text-white opacity-70`

  const handleAuthButtonClick = () => {
    if (signedIn) {
      toggleConfirmModal()
    } else {
      toggleSignInModal()
    }
  }
  return (
    <>
      <header
        className={clsx(
          'relative flex w-full flex-col items-center', // display
          'h-[70vh] max-h-[450px] md:h-fit md:max-h-[50vh]', // dimensions
          ' bg-gradient-to-b from-indigo-400 from-20% via-indigo-300 to-[#f5f6f7] bg-cover bg-center', // background
        )}
      >
        <CollisionsAnimation />
        <nav className='flex h-16 w-full items-stretch justify-between border-b-2 border-gray-400 bg-transparent px-4 md:h-20 xl:h-24'>
          <div
            className={`flex h-full items-center px-4 text-center font-robotoSlab text-lg font-bold leading-6 text-white md:text-xl md:leading-7 xl:text-2xl xl:leading-8`}
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
            <div className='h-full py-4'>
              <button
                className={`mx-4 flex h-full items-center justify-center rounded-full border-2 border-white px-4 text-base font-medium leading-6 text-white  md:w-auto md:text-lg md:leading-7 xl:w-auto xl:text-xl`}
                onClick={handleAuthButtonClick}
                style={{ minWidth: '100px' }}
              >
                {signedIn ? username : 'Sign in'}
                {signedIn && (
                  <img
                    src='/images/logout-white.svg'
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
              className={`size-8 bg-[url('/images/menu.svg')] bg-cover bg-center `}
              onClick={toggleMobileNavMenu}
            />
          </div>
        </nav>
        <div
          className={clsx(
            'relative flex grow flex-col items-center justify-between', // display
            'max-w-[452px]  md:max-w-[452px]  md:px-[4px] xl:max-w-[608px]', // dimensions
            'px-[16px] pb-[32px] pt-[30px] md:pb-[48px] md:pt-[38px] xl:py-[80px]', // padding
            'xl:justify-normal xl:gap-[88px]',
          )}
        >
          <div
            id='header-text'
            className={clsx(
              'flex flex-col gap-y-[16px] xl:gap-y-[32px]', // display
              'text-white', // typography
              'mb-9',
            )}
          >
            <p
              className={clsx(
                'font-robotoSlab text-[36px] leading-[40px] xl:text-[60px] xl:leading-[64px]',
              )} // typography
            >
              What&apos;s going on in the world?
            </p>
            <p
              className={clsx('text-[18px] leading-[24px]')} // typography
            >
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>
          <search className='w-full'>
            <Form
              id='search-form'
              className={clsx(
                'relative', // positioning
                'flex flex-col gap-[16px] md:flex-row', // display
                'w-full', // dimensions
              )}
              onSubmit={handleSearchSubmit}
              state={{ fromSearch: true }}
            >
              <input
                name='search-term'
                ref={inputRef}
                id='search-term'
                type='text'
                placeholder='Topic'
                onFocus={scrollToInput}
                className={clsx(
                  'h-[56px] w-full rounded-3xl xl:h-[64px]', // dimensions
                  'px-[16px] focus:outline-none md:px-[24px] md:pr-[196px] xl:pr-[208px]', // margin and padding
                )}
                value={searchValue}
                onChange={handleInputChange}
              />
              <button
                type='submit'
                className={clsx(
                  'h-[56px] w-full rounded-3xl xl:h-[64px]', // dimensions
                  'text-[18px] text-white', // typography
                  'md:absolute md:right-0 md:w-[160px] xl:w-[168px]', // positioning
                  'bg-blue-600 hover:bg-[#347EFF] active:bg-[#2A65CC]',
                )}
                disabled={!isSearchActive}
              >
                Search
              </button>
            </Form>
          </search>
        </div>
      </header>
      <main id='home-main'>
        <section id='home-main-search-results'>
          {navigation.state === 'loading' &&
          navigation.location?.state?.fromSearch ? (
            <Loading />
          ) : (
            <Outlet />
          )}
        </section>
        <section
          id='home-main-about-me'
          className='w-full bg-gradient-to-b from-[#f5f6f7] from-10% via-white to-white'
        >
          <div
            className={clsx(
              'flex flex-col items-center justify-center md:flex-row xl:justify-start', // display
              'mx-auto gap-[24px] px-[16px] pb-[128px] pt-[32px] md:gap-[32px] md:p-[40px] md:pt-[44px] xl:gap-[56px] xl:px-[104px] xl:py-[80px]', // spacing
              'max-w-[1440px] xl:h-auto', // dimensions
              'bg-transparent',
              { 'md:h-[354px]': isAboutMeExpanded === false }, // conditional
            )}
          >
            <div
              className={clsx(
                'min-h-[272px] min-w-[272px] md:min-h-[232px] md:min-w-[232px] xl:min-h-[464px] xl:min-w-[464px]', // dimesions
                'bg-[url("/images/IMG_20231104_141259_716.jpg")]  bg-cover', // background
                'rounded-full', // effects.
              )}
            ></div>
            <div className='md flex max-w-[600px] flex-col gap-[16px] xl:gap-[35px] xl:self-start xl:pt-[51px]'>
              <h2
                className={clsx(
                  'font-robotoSlab text-[30px] leading-[40px] md:h-[34px] xl:text-[40px] xl:leading-[46px]',
                )}
              >
                About me
              </h2>
              <div
                className={clsx(
                  'relative flex flex-col gap-[24px] text-justify text-[18px]',
                  {
                    'max-h-[196px] overflow-y-hidden md:max-h-[168px]':
                      !isAboutMeExpanded,
                    'md:overflow-hidden': true,
                  },
                )}
              >
                <p className='text-[18px] leading-[24px]'>
                  Hey 👋, I&apos;m Mayer, a full-stack developer 🚀. I lead a
                  team of mobile and web developers in the Israeli Defence
                  Forces.
                </p>
                <p className='text-[18px] leading-[24px]'>
                  Our work involves understanding the specific processes of our
                  organization and engineering systems that enhance and automate
                  their workflows. We specialize in creating solutions that
                  collect, analyze, and visualize data with the aim of improving
                  decision-making.
                </p>
                <p className='text-[18px] leading-[24px]'>
                  In addition to my development role, a significant part of my
                  responsibilities involves studying our clients&apos; business
                  processes to create BPDs and plan database infrastructure to
                  make sure we implement the most appropriate technologies to
                  our solutions. Moreover, I am actively involved in educating
                  new recruits about our technology stack, ensuring they are
                  well-equipped and knowledgeable for their roles after my
                  departure.
                </p>
                <p className='text-[18px] leading-[24px]'>
                  I am passionate about building and designing. Crafting apps
                  that offer an incredible experience for both developers and
                  users is something I find truly rewarding.
                </p>
                <p className='text-[18px] leading-[24px]'>
                  I have a particular fondness for static types, especially Rust
                  and TypeScript.
                </p>
                <p className='text-[18px] leading-[24px]'>
                  Above all, I&apos;m a self-learner. I enjoy working on my
                  personal projects and staying up to date with new technologies
                  and frameworks - with htmx, SvelteKit, and Remix currently
                  topping my list of interests.
                </p>
                {!isAboutMeExpanded && (
                  <div
                    className={clsx(
                      'absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-b from-transparent to-[#ffffff]',
                    )}
                  ></div>
                )}
              </div>

              <button
                className={clsx(
                  'mt-4 text-[16px] font-medium',
                  'text-[#B6BCBF] hover:text-gray-600',
                )}
                onClick={toggleExpansion}
              >
                {isAboutMeExpanded ? 'See less' : 'See more'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
