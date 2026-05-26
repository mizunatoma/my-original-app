//ログイン状態をチェックするためのカスタムhook
import { supabaseBrowser } from '@/app/_utils/supabaseBrowser'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const useSupabaseSession = () => {
  // undefined: ログイン状態ロード中, null: ログインしていない, Session: ログインしている
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    // 初回セッション取得
    const fetcher = async () => {
      const { data } = await supabaseBrowser.auth.getSession()
      setSession(data.session)
    }
    fetcher()

    // 認証状態の変更をリアルタイムで監視
    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      },
    )

    // コンポーネントがアンマウントされたとき、クリーンアップ
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return { session, isLoading: session === undefined }
}
