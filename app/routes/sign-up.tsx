import { ActionFunctionArgs, json, redirect } from '@vercel/remix'
import invariant from 'tiny-invariant'
import { createUser } from '~/services/auth.server'
import { getSession, commitSession } from '~/session.server'

export const loader = () => {
  return redirect('/')
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const username = String(formData.get('username'))

  invariant(email, 'email is required')
  invariant(password, 'password is required')
  invariant(username, 'username is required')

  const {
    success: signupSuccess,
    response: signupResponse,
    token,
  } = await createUser({ email, password, name: username })

  if (!signupSuccess) {
    return json({
      success: false,
      message: signupResponse.message || 'Unauthorized',
      status: signupResponse.status || 401,
    })
  }

  if (!token) {
    return json({
      success: false,
      message: 'No token provided',
      status: 500,
    })
  }

  const session = await getSession(request.headers.get('Cookie'))
  session.set('username', username)
  session.set('token', token)

  return redirect('/saved-articles', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export type SignupAction = typeof action
