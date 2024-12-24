"use client"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { saveUser } from "@/app/actions"
import { useEffect } from "react"

export default function(){
  const { data: session } = useSession()
  useEffect(() => {
    saveUser(session?.user)
  }, [])
  return (
    <div className="flex items-center gap-5">
      <img src={session?.user?.image} alt={session?.user?.name} className="w-24 h-24 rounded-full" />
      <div className="flex-1">
        <small className="text-md">Welcome</small>
        <p className="text-3xl font-bold">{session?.user?.name}</p>
      </div>
    </div>
  )
}