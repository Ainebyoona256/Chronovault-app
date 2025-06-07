import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        // Check for admin credentials
        if (credentials.username === "Ainebyoona" && credentials.password === "Ainebyoona") {
          // Create or get admin user
          const adminUser = await prisma.user.upsert({
            where: { email: "admin@chronovault.app" },
            update: {},
            create: {
              email: "admin@chronovault.app",
              name: "Admin",
              role: "ADMIN",
            }
          })
          return adminUser
        }

        throw new Error("Invalid credentials")
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true }
        })
        
        session.user.role = user?.role || "USER"
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    }
  }
} 