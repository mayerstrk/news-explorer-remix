import { destroySession, getSession } from '~/session.server'
import { z } from 'zod'
import { requestBuilder } from '../builders/db-api-request-builder'
import { DBApiErrorSchema } from '../utils/db-api-zod-error-schemas'
import { SuccessResponse } from '../types/utility-types'
import {
  DBApiProtectedEndpoint,
  DBApiPublicEndpoint,
  Route,
} from '~/utils/enums'
import { redirect } from '@vercel/remix'

const enum AuthState {
  notSignedIn,
  signedIn,
  tokenValidationFailed,
}

type ServerAuthResponsePublicRoute = Promise<
  | {
      session: Awaited<ReturnType<typeof getSession>>
      authState: AuthState.notSignedIn
      response: null
    }
  | {
      session: Awaited<ReturnType<typeof getSession>>
      authState: AuthState.tokenValidationFailed
      response: z.infer<typeof DBApiErrorSchema>
    }
  | {
      session: Awaited<ReturnType<typeof getSession>>
      authState: AuthState.signedIn
      response: SuccessResponse<
        Awaited<ReturnType<typeof authenticateUserQuery>>
      >
    }
>

type ServerAuthResponseProtectedRoute = Promise<{
  session: Awaited<ReturnType<typeof getSession>>
  authState: AuthState.signedIn
  response: SuccessResponse<Awaited<ReturnType<typeof authenticateUserQuery>>>
}>

const createUserMutation = requestBuilder<
  { data: { message: string } },
  { email: string; password: string; name: string }
>(DBApiPublicEndpoint.signup, { method: 'POST' })

const signinMutation = requestBuilder<
  { data: { message: string; username: string } },
  { email: string; password: string }
>(DBApiPublicEndpoint.signin, { method: 'POST' })

const authenticateUserQuery = (token: string) =>
  requestBuilder<{
    data: { name: string; email: string }
  }>(DBApiProtectedEndpoint.getUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  })()

const serverAuthPublicRoute = async (
  request: Request,
): ServerAuthResponsePublicRoute => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')

  if (!token) {
    return { session, authState: AuthState.notSignedIn, response: null }
  }

  const { success: authenticated, response } =
    await authenticateUserQuery(token)

  if (!authenticated) {
    return {
      session,
      authState: AuthState.tokenValidationFailed,
      response,
    }
  }

  return { session, authState: AuthState.signedIn, response }
}

const serverAuthProtectedRoute = async (
  request: Request,
): ServerAuthResponseProtectedRoute => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')

  if (!token) {
    throw redirect(Route.home)
  }

  const { success: authenticated, response } =
    await authenticateUserQuery(token)

  if (!authenticated) {
    throw redirect(Route.home, {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  return { session, authState: AuthState.signedIn, response }
}

export {
  AuthState,
  createUserMutation,
  signinMutation,
  authenticateUserQuery,
  serverAuthPublicRoute,
  serverAuthProtectedRoute,
}
