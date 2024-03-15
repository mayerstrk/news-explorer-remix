import { redirect } from '@remix-run/node'

export const loader = () => {
  return redirect('/home')
}

export default function Index() {}
