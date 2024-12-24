"use client"
import { signIn, useSession } from "next-auth/react"
import {useRouter} from 'next/navigation'
// import { Button } from "antd"
import Image from "next/image"

export default function Auth() {
    const router = useRouter()
    const { data:session } = useSession() 
  
    if(session && session.user) {
      return router.push('/app')
    }
    
    return (
      <button onClick={() => signIn("google")}>Start Sign In with Google</button>
    )
}