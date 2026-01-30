//ログイン状態をチェックするためのカスタムhook
import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { Session } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export const useSupabaseSession = () => {
  // undefined: ログイン状態ロード中, null: ログインしていない, Session: ログインしている
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => {
    const fetcher = async () => {
      const { data } = await supabaseBrowser.auth.getSession()
      setSession(data.session)
    }
    fetcher()
  }, [])

  return { session, isLoading: session === undefined }
}