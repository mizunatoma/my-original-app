'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouteGuard } from './_hooks/useRouteGuard'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useRouteGuard()

  const pathname = usePathname()
  const isSelected = (href: string) => {
    return pathname === href
  }

  return (
    <>
      {/* サイドバー */}
      <aside className="fixed bg-gray-100 w-[280px] left-0 bottom-0 top-[72px]">
        <Link
          href="/user/timeline"
          className={`p-4 block hover:bg-blue-100 ${isSelected('/user/timeline') && 'bg-blue-100'
            }`}
        >
          Timeline
        </Link>
        <Link
          href="/user/tasks"
          className={`p-4 block hover:bg-blue-100 ${isSelected('/user/tasks') && 'bg-blue-100'
            }`}
        >
          Tasks
        </Link>
        <Link
          href="/user/routines"
          className={`p-4 block hover:bg-blue-100 ${isSelected('/user/routines') && 'bg-blue-100'
            }`}
        >
          Routines
        </Link>
        <Link
          href="/user/analytics"
          className={`p-4 block hover:bg-blue-100 ${isSelected('/user/analytics') && 'bg-blue-100'
            }`}
        >
          Analytics
        </Link>
      </aside>

      {/* メインエリア */}
      <div className="ml-[280px] p-4">{children}</div>
    </>
  )
}

