"use client";
import type { UploadProps } from "antd";
import { Input, Upload, Flex, Button, message } from "antd";
import { Upload as UploadIcon } from "lucide-react";
import { useRef } from "react"


export default function () {
  const formRef = useRef<HTMLFormElement>(null)
  const formData = new FormData()
  const [messageApi, contextHolder] = message.useMessage()

  const { Dragger } = Upload;
  const props: UploadProps = {
    onRemove: (file) => {
      formData.delete("song")
    },
    beforeUpload: (file) => {
      formData.append("song", file)
    },
    multiple: false,
    accept: "audio/*",
  };

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
        messageApi.open({
          type: 'success',
          content: resData.message,
        });
      }
    }

  }

  return (
    <main className="px-4 flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleFormSubmit}>
        <h1 className="text-3xl font-bold mb-2">Upload Song</h1>
        <Input size="large" type="text" name="name" placeholder="Song Name.." />
        <Flex gap="middle">
          <Input size="large" type="text" name="artist" placeholder="Song Artist.." />
          <Input size="large" type="text" name="featurings" placeholder="Featurings..." />
        </Flex>
        <Upload {...props}>
          <Button icon={<UploadIcon className="w-4 h-4" />}>Select File</Button>
        </Upload>
        <Button size="large" type="primary" onClick={() => formRef.current?.requestSubmit()}>Submit Form</Button>
      </form>
    </main>
  );
}
