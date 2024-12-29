import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import db from "@/config/db"
import { ExtendedProfile, User } from "@/types"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<any> {
      const user = await db.prepare("SELECT * FROM users WHERE id = ?").get(token.id) as User
      session.user = user
      return session
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === 'google' && profile) {
        const userProfile = profile as ExtendedProfile
        const query = db.prepare("INSERT OR IGNORE INTO users (id, name, email, image) VALUES (?, ?, ?, ?)")
        query.run(userProfile.sub, userProfile.name, userProfile.email, userProfile.picture)
        token.id = userProfile.sub
      }
      return token
    },
  },
})

export { handler as GET, handler as POST }
