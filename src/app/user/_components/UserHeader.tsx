'use client'

import Link from 'next/link'
import React from 'react'
import { useSupabaseSession } from '../../_hooks/useSupabsaeSession'
import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { useRouter } from 'next/navigation'

interface UserHeaderProps {
  toggleSidebar: () => void // ＝引数なし、戻り値なしの関数
  isCollapsed: boolean
  isTodoPanelOpen: boolean
}

export default function UserHeader({ toggleSidebar, isCollapsed, isTodoPanelOpen }: UserHeaderProps) {
  const router = useRouter()
  const { session, isLoading } = useSupabaseSession()

  // ４段階のヘッダー幅調整
  const mainWidth = isCollapsed ? 80 : 160;
  const subWidth = isTodoPanelOpen ? 300 : 0; // サブサイドバーの幅（300px）
  const totalLeft = mainWidth + subWidth; // 80, 160, 380, 460 のいずれかになる

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut()
    await router.replace('/')
  }

  return (
    <header
      className='fixed bg-white border-b border-[#EFEDE6] px-6 py-4 flex justify-between items-center top-0 right-0 z-30 transition-all duration-300'
      style={{ left: `${totalLeft}px` }}
    >

      {/*左：ハンバーガーメニュー＋ロゴ*/}
      <div className='flex items-center gap-4'>
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#DDD9CC] hover:bg-[#E8E4D9] rounded text-gray-700 transition-colors ">
          ☰
        </button>
        <span className="font-bold text-gray-800 text-lg">One Track</span>
      </div>

      {/*右：ユーザアイコン*/}
      {!isLoading && (
        <div className="flex items-center gap-4">
          {session &&
            <>
              <Link href="/contact" className="text-sm text-gray-600 hover:underline">お問い合わせ</Link>
              <button onClick={handleLogout} className="text-sm text-gray-600 hover:underline">ログアウト</button>
            </>
          }
        </div>
      )
      }
    </header >
  )
}