import db from "@/config/db"
import JoinCard from "./components/JoinCard"

export default async function({ params }: { params: Promise<{ id: string }>}){
  const { id } = await params
  const result = db.prepare("SELECT name, image FROM users WHERE id = ?").get(id)
  const user = result as {name: string, image: string}
  
  if(user) {
    return <JoinCard roomId={id} user={user} />
  }
}