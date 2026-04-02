'use client'
import { useState } from 'react'
import { useRouteGuard } from './_hooks/useRouteGuard'
import UserSidebar from './_components/UserSidebar'
import UserHeader from './_components/UserHeader'
import TodoPanel from './_components/TodoPanel'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useRouteGuard()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const [isTodoPanelOpen, setIsTodoPanelOpen] = useState(false)
  const toggleTodoPanel = () => setIsTodoPanelOpen(!isTodoPanelOpen)

  return (
    <>
      <UserHeader
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        isTodoPanelOpen={isTodoPanelOpen}
      />
      <UserSidebar
        isCollapsed={isCollapsed}
        toggleTodoPanel={toggleTodoPanel}
        isTodoPanelOpen={isTodoPanelOpen}
      />
      <TodoPanel isTodoPanelOpen={isTodoPanelOpen} isCollapsed={isCollapsed} />

      <div
        className={`transition-all duration-300 ${
          isCollapsed ? 'ml-[80px]' : 'ml-[160px]'
        } p-4 pt-20`}
      >
        {children}
      </div>
    </>
  )
}
