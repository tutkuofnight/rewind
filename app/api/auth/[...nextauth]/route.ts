import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import db from "@/config/db"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<any> {
      let user: any
      user = db.prepare("SELECT * FROM users WHERE id = ?").get(token.id)
      if (!user){
        user = session.user
      }
      return { user, expires: session.expires }
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === 'google' && profile) {
        const query = db.prepare("INSERT OR IGNORE INTO users (id, name, email, image) VALUES (?, ?, ?, ?)")
        query.run(profile.sub, profile.name, profile.email, profile.picture)
        token.id = profile.sub
      }
      return token
    },
  },
})

export { handler as GET, handler as POST }
