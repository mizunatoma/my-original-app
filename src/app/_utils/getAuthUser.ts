// APIルートで「誰がリクエストしてるか」を取り出す
// 使用先：全 route.ts の先頭

import { NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'
import { supabaseServerClient } from './supabaseServerClient'

export type AuthResult = { user: User } | NextResponse<{ error: string }>

export const getAuthUser = async (): Promise<AuthResult> => {
  const supabase = await supabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return { user }
}
