"use client"
import Link from "next/link"
import { Button } from "antd"
import { search } from "@/store"
import { useAtom } from "jotai"
export default function Header() {
  const [searchStr, setSearchStr] = useAtom<string>(search)
  
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-logo">Rewind</h1>
      <div className="flex items-center gap-3">
        <input type="text" onChange={(e) => setSearchStr(e.target.value)} />
        <Button>Sign In</Button>
        <Link href="/account">
        </Link>
          <Button type="primary">Sign Up</Button>
        <Link href="/account">
        </Link>
      </div>
    </header>
  )
}
