import { LoaderFunctionArgs, json, redirect } from '@vercel/remix'
import { Outlet, useLoaderData } from '@remix-run/react'
import HomeAuthor from './home-author'
import HomeHeader from './home-header'
import NavBarMain from '~/root-layout-components/nav-bar-main'
import { destroySession, getSession } from '~/session.server'
import { getCurrentUser } from '~/services/users.server'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  console.log('===================================')
  console.log('@home session data: ', session.data)

  const token = session.get('token')

  if (!token) {
    console.log('@home: no token')

    return json(
      {
        searchTerm: params.searchTerm || '',
        signedIn: false,
        username: null,
      },
      { status: 200 },
    )
  }

  console.log('@home: token=', token)

  console.log('@home: attempting to get user...')
  const { success, response } = await getCurrentUser(token)

  if (!success) {
    console.log('      @home: get failed')
    return redirect('/', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  console.log('      @home: get success')

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
  console.log('home rendered')
  const { signedIn, username } = useLoaderData<typeof loader>()
  return (
    <>
      <NavBarMain color='white' signedIn={signedIn} username={username} />
      <HomeHeader />
      <Outlet />
      <HomeAuthor />
    </>
  )
}

export type HomeLoader = typeof loader
