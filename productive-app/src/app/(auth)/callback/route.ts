import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/tasks' /** Default to /tasks or / */

  if (code) {
    const supabase = await createClient()
    
    /** This exchanges the "code" from Google for a Supabase "Session" */
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      /** If successful, redirect the user to the dashboard */
      const forwardedHost = request.headers.get('x-forwarded-host') // Load balancer check
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  /** return the user to an error page with instructions */
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}