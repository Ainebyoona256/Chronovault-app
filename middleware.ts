import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "ADMIN",
  },
})

export const config = {
  matcher: [
    "/admin/:path*",  // Protect all admin routes
    "/api/admin/:path*",  // Protect admin API routes
  ],
} 