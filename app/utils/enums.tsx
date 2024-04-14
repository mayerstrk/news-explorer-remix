const enum Route {
  home = '/home',
  savedArticles = '/saved-articles',
  signin = '/sign-in',
  signup = '/sign-up',
  signout = '/sign-out',
}

const enum PopupName {
  signin = 'sign-in',
  signup = 'sign-up',
  navMenu = 'nav-menu',
  confirm = 'confirm',
  error = 'error',
  notify = 'notify',
}

const enum Size {
  'sm',
  'md',
  'xl',
}

const enum DBApiPublicEndpoint {
  signin = '/signin',
  signup = '/signup',
  signout = '/signout',
  articles = '/articles',
}

const enum DBApiProtectedEndpoint {
  getUser = '/users/me',
}

type DBApiEndpoint = DBApiPublicEndpoint | DBApiProtectedEndpoint

export {
  Route,
  PopupName,
  Size,
  DBApiPublicEndpoint,
  DBApiProtectedEndpoint,
  type DBApiEndpoint,
}
