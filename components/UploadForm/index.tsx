"use client"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

export default function () {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { data:session } = useSession()
  
  const formData = new FormData()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return
    
    setIsSubmitting(true)
    const form: any = formRef.current

    formData.append("name", form.name.value)
    formData.append("artist", form.artist.value)
    formData.append("featurings", form.featurings.value)
    formData.append("userId", session?.user.id as string)

    if (!formData.has("song")) {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "Please select a song file",
        variant: "destructive"
      })
      return
    }

    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        body: formData,
        method: "POST",
      })
      
      if (res.ok) {
        toast({
          title: "Track Successfully Uploaded",
          description: "...",
        })
        formRef.current?.reset()
      } else {
        toast({
          title: "Upload Error",
          description: "...",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      formData.append("song", file)
    }
  }

  return (
    <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleFormSubmit}>
      <h1 className="text-3xl font-bold">{session?.user.id as string}</h1>
      <Input type="text" name="name" placeholder="Track Name.." required />
      <div className="flex gap-3">
        <Input type="text" name="artist" placeholder="Track Artist.." required />
        <Input type="text" name="featurings" placeholder="Featurings..." />
      </div>
      <Label htmlFor="track">Click here and upload track</Label>
      <Input 
        id="track" 
        type="file" 
        className="-mt-2" 
        onChange={handleUploadFile}
        required
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Uploading..." : "Submit Form"}
      </Button>
    </form>
  )
}