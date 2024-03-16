import { appRedirect } from '~/utils/remix'

export const loader = () => appRedirect('/home')
