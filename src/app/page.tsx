"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { CornerDownLeft } from "lucide-react"
import { set, useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"

const schema = z.object({
  message: z.string().min(1),
})

type InputValues = z.infer<typeof schema>

interface Messages {
  _id: number
  message: string
}

export default function Home() {
  const [message, setMessage] = useState<InputValues>({
    message: "",
  })
  const { register, handleSubmit, reset } = useForm<InputValues>({
    defaultValues: message,
  })
  const [messages, setMessages] = useState<Messages[]>([])

  async function onSubmit(data: SubmitHandler<InputValues>) {
    try {
      const response = await axios.post("http://localhost:5050/record/analyze", data)

      if (response.status === 200) {
        setMessage({ message: "" })
        reset()

        console.log("Message sent", response.status)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get("http://localhost:5050/record/")

        if (response.status === 200) {
          setMessages(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    async function clear() {
      axios
        .post(`http://localhost:5050/record/clear/`)
        .then((response) => {
          console.log("Cleared the database")
          console.log(response.status)
        })
        .catch((error) => {
          console.error("Failed to clear the database")
          console.error(error)
        })
    }

    // clear()

    fetchMessages()
  }, [message])

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">PersonaCraft</h1>
        </header>

        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex"></div>
          <div className="relative flex h-full min-h-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="flex-1 space-y-4">
              {messages.map(({ _id, message }: Messages) => (
                <div
                  className="ml-auto flex w-max max-w-[75%] flex-col gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                  key={_id}
                >
                  <p>{message}</p>
                </div>
              ))}
            </div>
            <form
              className="relative mt-4 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              onSubmit={handleSubmit(onSubmit as unknown as SubmitHandler<InputValues>)}
            >
              <Label className="sr-only" htmlFor="message">
                Message
              </Label>
              <Textarea
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                id="message"
                {...register("message")}
                placeholder="Type your message here..."
                onChange={(event) => setMessage({ message: event.target.value })}
              />
              <div className="flex items-center p-3 pt-0">
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
