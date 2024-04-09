import { LoaderFunctionArgs, json, redirect } from '@vercel/remix'
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react'
import HomeAuthor from './home-author'
import HomeHeader from './home-header'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { destroySession, getSession } from '~/session.server'
import { authenticateUser } from '~/services/auth.server'
import { Loading } from '../home.search.$searchTerm'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')

  if (!token) {
    return json(
      {
        searchTerm: params.searchTerm || '',
        signedIn: false,
        username: null,
      },
      { status: 200 },
    )
  }

  const { success: authenticated, response } = await authenticateUser(token)

  if (!authenticated) {
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
  return (
    <>
      <NavBarMain color='white' signedIn={signedIn} username={username} />
      <HomeHeader />
      {navigation.state === 'loading' &&
      !navigation.location?.state?.showMore ? (
        <Loading />
      ) : (
        <Outlet />
      )}
      <HomeAuthor />
    </>
  )
}

export type HomeLoader = typeof loader
