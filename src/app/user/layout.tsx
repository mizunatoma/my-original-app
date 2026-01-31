'use client'

import { useRouteGuard } from './_hooks/useRouteGuard'
import UserSidebar from './_components/UserSidebar'
import UserHeader from './_components/UserHeader'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useRouteGuard()

  return (
    <>
      <UserHeader />
      <UserSidebar />
      <div className="ml-[280px] p-4">{children}</div>
    </>
  )
}
