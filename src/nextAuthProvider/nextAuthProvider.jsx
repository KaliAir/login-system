"use client"
import { SessionProvider } from "next-auth/react"

function NextAuthProvider({children,session}) {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default NextAuthProvider