'use client'

import Link from 'next/link'
import React from 'react'
import { useSupabaseSession } from '../../_hooks/useSupabsaeSession'
import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useRouter } from 'next/navigation'

interface UserHeaderProps {
  toggleSidebar: () => void // ＝引数なし、戻り値なしの関数
}

export default function UserHeader({ toggleSidebar }: UserHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut()
    await router.replace('/')
  }

  const { session, isLoading } = useSupabaseSession()

  return (
    <header className="bg-gray-800 text-white p-6 font-bold flex justify-between items-center">

      <div className='flex items-center gap-4'>
        <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-lg text-2xl transition-colors">
          ☰
        </button>
        <Link href="/" className="header-link">
          Blog
        </Link>
      </div>

      {!isLoading && (
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin" className="header-link">
                管理画面
              </Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact" className="header-link">
                お問い合わせ
              </Link>
              <Link href="/login" className="header-link">
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}