import { ActionFunctionArgs, redirect } from '@vercel/remix'
import { destroySession, getSession } from '~/session.server'

export const loader = () => {
  redirect('/')
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  return redirect('/', {
    headers: { 'Set-Cookie': await destroySession(session) },
  })
}
