import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  /**Create an unmodified response */
  let supabaseResponse = NextResponse.next({ request });

  /**Initialize supabase server client */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          /**Updates response with new cookies (refreshing tokens) */
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  /**Get user
   * Secure as it verifies token with supabase
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

//   console.log(user);

  /**AUTH GUARD LOGIC */
  const path = request.nextUrl.pathname;

  /** Protected Routes */
  const protectedPaths = ["/tasks", "/profile", "/settings"];

  const isProtectedRoute = protectedPaths.some((route) =>
    path.startsWith(route)
  );

  /**If trying to access protected route AND not logged in -> Redirect to Login */
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    /**Add a query param to redirect back after login */
    // url.searchParams.set('next', path)
    return NextResponse.redirect(url);
  }

  /** Auth Routes: If already logged in, prevent access to Login/Signup */
  if (user && (path === "/login" || path === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = "/tasks"; // Redirect to your dashboard
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
