//アクセス制限のロジックを一括管理するためのカスタムhook

import { useSupabaseSession } from "./useSupabsaeSession";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useRouteGuard = () => {
  const router = useRouter()
  const { session, isLoading } = useSupabaseSession()

  useEffect(() => {
    if (isLoading) return // sessionの取得中は何もしない

    const fetcher = async () => {
      if (session === null) {
        router.replace('/signup')
      }
    }

    fetcher()
  }, [router, isLoading, session])
}