import db from "@/config/db"
import JoinCard from "./components/JoinCard"

export default async function({ params }: { params: { id: string } }){
  const result = await db.prepare("SELECT name, image FROM users WHERE id = ?").get(params.id)
  const user = result as {name: string, image: string}
  
  if(user) {
    return <JoinCard roomId={params.id} user={user} />
  }
}