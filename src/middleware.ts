import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

export const middleware = async (request: NextRequest) => {
  let response = NextResponse.next()

  // Cookie と Supabase をつなぐ
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // セッション同期 ここで「認証判定」はしていない。
  await supabase.auth.getUser()
  // Cookie 状態が整った response を返す
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}