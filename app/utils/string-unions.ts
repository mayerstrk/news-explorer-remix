export type Route =
  | '/home'
  | '/home/sign-in'
  | '/home/sign-up'
  | '/saved-articles'
export type Size = 'sm' | 'md' | 'xl'
export type PopupName = 'sign-in' | 'sign-up' | 'nav-menu'
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
export type ApiPublicEndpoint = '/signin' | '/signup' | '/signout'
export type ApiProtectedEndpoint = '/users/me'
export type ApiEndpoint = ApiPublicEndpoint | ApiProtectedEndpoint
