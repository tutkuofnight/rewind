"use client";
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
export default function () {
  const formRef = useRef<HTMLFormElement>(null)
  const formData = new FormData()
  const { toast } = useToast()

  const handleFormSubmit = async (e: any) => {
    let isError: boolean = false
    e.preventDefault()
    const form: any = formRef.current

    formData.append("name", form.name.value)
    formData.append("artist", form.artist.value)
    formData.append("featurings", form.featurings.value)
    
    if (!formData.has("song")) {
      isError = true
    }

    if (!isError) {
      const res = await fetch("http://localhost:3000/api/upload", {
        body: formData,
        method: "POST",
      })
      const resData = await res.json()
      if (res.status == 200) {
        toast({
          title: "Track Succesfullly Uploaded",
          description: "...",
        })
      } else {
        toast({
          title: "Upload Error",
          description: "...",
          variant: "destructive"
        })
      }
    }
  }

  const handleUploadFile = (e: any) => {
    formData.append("song", e.target.files[0])
  }

  return (
    <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleFormSubmit}>
      <h1 className="text-3xl font-bold">Upload Track</h1>
      <Input type="text" name="name" placeholder="Track Name.." />
      <div className="flex gap-3">
        <Input type="text" name="artist" placeholder="Track Artist.." />
        <Input type="text" name="featurings" placeholder="Featurings..." />
      </div>
      <Label htmlFor="track">Click here and uplaod track</Label>
      <Input id="track" type="file" className="-mt-2" onChange={handleUploadFile} />
      <Button onClick={() => formRef.current?.requestSubmit()}>Submit Form</Button>
    </form>
  );
}
