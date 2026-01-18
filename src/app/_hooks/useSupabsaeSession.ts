//ログイン状態をチェックするためのカスタムhook

import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { Session } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export const useSupabaseSession = () => {
  // undefined: ログイン状態ロード中, null: ログインしていない, Session: ログインしている
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [token, setToken] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session },
      } = await supabaseBrowser.auth.getSession()
      setSession(session)
      setToken(session?.access_token || null)
    }

    console.log(token);

    fetcher()
  }, [pathname])

  return { session, isLoading: session === undefined, token }
}