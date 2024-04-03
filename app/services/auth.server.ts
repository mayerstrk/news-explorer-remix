import requestBuilder from './request-builder.server'

export const createUser = requestBuilder<
  { data: { message: string } },
  { email: string; password: string; name: string }
>('/signup', { method: 'POST' })

export const signIn = requestBuilder<
  { data: { message: string; username: string } },
  { email: string; password: string }
>('/signin', { method: 'POST' })
