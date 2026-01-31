'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface UserSidebarProps {
  isCollapsed: boolean
}

// リンク部分を共通化
function SidebarLink({ href, icon, label, isSelected, isCollapsed }: any) {
  return (
    <Link
      href={href}
      className={`p-4 block ... ${isSelected ? 'bg-blue-100 text-blue-600' : '...'}`}
    >
      <span className='text-xl shrink-0'>{icon}</span>
      {!isCollapsed && <span className='font-bold whitespace-nowrap'>{label}</span>}
    </Link>
  )
}

export default function UserSidebar({ isCollapsed }: UserSidebarProps) {
  const pathname = usePathname()
  const isSelected = (href: string) => pathname === href

  return (
    <aside className={`transition-all duration-300 fixed bg-gray-100 left-0 bottom-0 top-[72px] ${isCollapsed ? 'w-[80px]' : 'w-[280px]'}`}>
      <nav>
        <SidebarLink
          href="/user/timeline"
          icon="🕘"
          label="timeline"
          isSelected={isSelected('/user/timeline')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/user/analytics"
          icon="📊"
          label="Analytics"
          isSelected={isSelected('/user/analytics')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/user/tasks"
          icon="📝"
          label="Tasks"
          isSelected={isSelected('/user/tasks')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          href="/user/routines"
          icon="🔄"
          label="Routines"
          isSelected={isSelected('/user/routines')}
          isCollapsed={isCollapsed}
        />
      </nav>
    </aside>
  )
}
