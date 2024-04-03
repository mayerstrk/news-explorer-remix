import requestBuilder from './request-builder.server'

export const getCurrentUser = (token: string) =>
  requestBuilder<{
    data: { name: string; email: string }
  }>('/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  })()
