"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CloudUpload } from "lucide-react"

export default function Header() {
  const { data:session, status } = useSession()
  const router = useRouter()

  const handleLogout = () => {
    signOut()
    router.push("/")
  }

  return (
    <header className="flex items-center justify-between w-full p-4 lg:w-[1024px] lg:mx-auto">
      <h1 className="text-2xl font-logo">Rewind</h1>
      <div className="flex items-center gap-3">
        {
          status == "authenticated" ? (
            <div className="flex items-center gap-4">
              <Button className="font-bold">
                <CloudUpload />
                Upload
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Image src={session.user?.image} alt={session.user?.name}  width={36} height={36} className="rounded-full" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          ) : (
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <Button variant={"outline"}>Open Source <Image src={"/heart.png"} width={16} height={16} alt="<3" /></Button>
            </a>
          )
        }
      </div>
    </header>
  )
}
