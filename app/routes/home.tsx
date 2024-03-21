import { Outlet } from '@remix-run/react'
import HomeAuthor from '~/components/home-author'
import HomeHeader from '~/components/home-header'

export default function Home() {
  return (
    <>
      <HomeHeader />
      <Outlet />
      <HomeAuthor />
    </>
  )
}
