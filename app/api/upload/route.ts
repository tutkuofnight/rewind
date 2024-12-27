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

    const query = db.prepare(`INSERT INTO songs 
        (id, name, artist, featurings, song) 
        VALUES (?, ?, ?, ?, ?)
    `)
    query.run(v4(), formData.get("name"), formData.get("artist"), formData.get("featurings"), file.name)

    return Response.json({
        message: "successfully uploaded"
    })
}