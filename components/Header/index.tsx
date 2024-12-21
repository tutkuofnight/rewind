"use client"
import Link from "next/link"
import { Button } from "antd"

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-logo">Rewind</h1>
      <div className="flex items-center gap-3">
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
