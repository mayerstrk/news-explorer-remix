export type Path =
  | '/home'
  | '/home/sign-in'
  | '/home/sign-up'
  | '/saved-articles'
export type PopupName = 'sign-in' | 'sign-up' | 'nav-menu'
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ApiPublicEndpoint = '/signin' | '/signup' | '/signout'
export type ApiProtectedEndpoint = '/users/me'
export type ApiEndpoint = ApiPublicEndpoint | ApiProtectedEndpoint
