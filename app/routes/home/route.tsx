import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from '@vercel/remix'
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react'
import HomeAuthor from './home-author'
import HomeHeader from './home-header'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { destroySession } from '~/session.server'
import { Loading } from '../home.search.$searchTerm'
import { AuthState, serverAuthPublicRoute } from '~/services.server/db-api/auth'

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
  const { signedIn, username } = useLoaderData<typeof loader>()
  const navigation = useNavigation()
  console.log('fromSearch: ', navigation.location?.state?.fromSearch)

  return (
    <>
      <NavBarMain color='white' signedIn={signedIn} username={username} />
      <HomeHeader />
      {navigation.state === 'loading' &&
      navigation.location?.state?.fromSearch ? (
        <Loading />
      ) : (
        <Outlet />
      )}
      <HomeAuthor />
    </>
  )
}

export type HomeLoader = typeof loader
