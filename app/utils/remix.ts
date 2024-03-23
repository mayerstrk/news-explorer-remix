import { redirect } from '@remix-run/node'
import {  } from '~/utils/string-unions'

export const appRedirect = (path: Path) => redirect(path)
