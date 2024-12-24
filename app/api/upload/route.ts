import db from "@/config/db"
import { writeFile } from "fs"
import { v4 } from "uuid"
import { NextResponse } from "next/server"

export async function POST(req:Request, res: Response) {
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

    return NextResponse.json({
        message: "successfully uploaded"
    })
}