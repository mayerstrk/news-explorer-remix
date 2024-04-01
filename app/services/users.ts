import requestBuilder from './request-builder'

export const getCurrentUser = requestBuilder<undefined>('/users/me')
