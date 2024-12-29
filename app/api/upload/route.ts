import db from "@/config/db"
import { writeFile } from "fs"
import { v4 } from "uuid"

export async function POST(req:Request) {
    const formData = await req.formData()
    const file: File = formData.get("song") as File

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath: string = "public/uploads/" + file.name

    writeFile(filePath, buffer, null, function(params: any) {
        console.log(params)
    })
    const songId = v4()
    const query = db.prepare(`INSERT INTO songs 
        (id, name, artist, featurings, song, userId) 
        VALUES (?, ?, ?, ?, ?, ?)
    `)
    query.run(songId, formData.get("name"), formData.get("artist"), formData.get("featurings"), file.name, formData.get("userId"))

    return Response.json({
        message: "successfully uploaded"
    })
}