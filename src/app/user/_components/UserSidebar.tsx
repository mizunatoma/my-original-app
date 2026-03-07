'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Timer, BarChart2, ClipboardList, RefreshCw } from 'lucide-react'

const MENU_ITEMS = [
  { href: "/user/timeline", icon: Timer, label: "timeline" },
  { href: "/user/analytics", icon: BarChart2, label: "analytics" },
  { href: "/user/tasks", icon: ClipboardList, label: "tasks" },
  { href: "/user/routines", icon: RefreshCw, label: "routines" },
]

interface UserSidebarProps {
  isCollapsed: boolean
}

// リンク部分を共通化
function SidebarLink({ href, icon, label, isSelected, isCollapsed }: any) {
  const Icon = icon
  return (
    <Link
      href={href}
      className={`h-12 flex items-center gap-3 rounded-xl transition-all 
        ${isCollapsed ? 'justify-center w-12' : 'px-3 mx-2'}
        ${isSelected
          ? 'text-gray-800 bg-[#E6E1D6] shadow-sm'
          : 'text-gray-500 hover:bg-[#E6E1D6] hover:text-gray-700'}`}
    >
      <div className={`w-7 h-7 flex items-center justify-center rounded-xl 
        ${isSelected
          ? 'bg-white/50'
          : 'bg-transparent'}`}>
        <Icon size={16} />
      </div>
      {!isCollapsed && <span className='text'>{label}</span>}
    </Link>
  )
}

export default function UserSidebar({ isCollapsed }: UserSidebarProps) {
  const pathname = usePathname()
  const isSelected = (href: string) => pathname === href

  return (
    <aside className={`fixed left-0 top-0 bottom-0 z-20 overflow-hidden bg-[#FCFAF7] border-r border-[#EFEDE6] p-4
    ${isCollapsed ? 'w-[80px]' : 'w-[230px]'}`}>
      <nav className='flex flex-col gap-1.5'>
        {MENU_ITEMS.map((item) => (
          <SidebarLink
            key={item.href}
            {...item}
            isSelected={isSelected(item.href)}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </aside>
  )
}
