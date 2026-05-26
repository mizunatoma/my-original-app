// /api/guest

import { supabaseServerClient } from '@/app/_utils/supabaseServerClient'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  try {
    const email: string = process.env.GUEST_EMAIL!
    const password: string = process.env.GUEST_PASSWORD!
    const supabase = await supabaseServerClient()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.log('POST /api/guest', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
