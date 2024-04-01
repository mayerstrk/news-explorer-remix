import requestBuilder from './request-builder'

export const createUser = requestBuilder<
  { message: string },
  { email: string; password: string; name: string }
>('/signup', { method: 'POST' })

export const signIn = requestBuilder<
  { message: string },
  { email: string; password: string }
>('/signin', { method: 'POST' })

export const signOut = requestBuilder<{ message: string }>('/signout', {
  method: 'POST',
})
