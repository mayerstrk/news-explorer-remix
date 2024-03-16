import { Outlet } from '@remix-run/react'
import HomeHeader from '~/components/home-header'

export default function Home() {
  return (
    <>
      <HomeHeader />
      <Outlet />
    </>
  )
}
