import { ActionFunctionArgs, json, redirect } from '@vercel/remix'
import invariant from 'tiny-invariant'
import { signinMutation } from '~/services.server/db-api/auth'
import { getSession, commitSession } from '~/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  invariant(email, 'email is required')
  invariant(password, 'password is required')
  console.log('@sign-in: attempting sign in...')
  const { success, response, token } = await signinMutation({
    email,
    password,
  })

  if (!success) {
    console.log('   @sign-in: sign in failed')
    return json({
      success: false,
      message: response.message || 'Unauthorized',
      status: response.status || 401,
    })
  }

  if (!token) {
    return json({
      success: false,
      message: 'No token provided',
      status: 500,
    })
  }

  console.log('   @sign-in: token found = ', token)
  console.log('   @sign-in: sign in success')

  const session = await getSession(request.headers.get('Cookie'))
  session.set('username', response.data.username)
  session.set('token', token)

  return redirect('/saved-articles', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export type SigninAction = typeof action
