import { requestBuilder } from './utils/db-api-request-builder.server'

export const createUser = requestBuilder<
  { data: { message: string } },
  { email: string; password: string; name: string }
>('/signup', { method: 'POST' })

export const signIn = requestBuilder<
  { data: { message: string; username: string } },
  { email: string; password: string }
>('/signin', { method: 'POST' })

export const authenticateUser = (token: string) =>
  requestBuilder<{
    data: { name: string; email: string }
  }>('/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  })()
