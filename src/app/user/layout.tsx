'use client'

import { useState } from 'react';
import { useRouteGuard } from './_hooks/useRouteGuard'
import UserSidebar from './_components/UserSidebar'
import UserHeader from './_components/UserHeader'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useRouteGuard()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <>
      <UserHeader toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      <UserSidebar isCollapsed={isCollapsed} />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-[80px]' : 'ml-[160px]'} pt-20 p-4`}>
        {children}
      </div>
    </>
  )
}
