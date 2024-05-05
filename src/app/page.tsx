import { CornerDownLeft, Triangle } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">PersonaCraft</h1>
        </header>

        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex"></div>
          <div className="relative flex h-full min-h-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="flex-1" />
            <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                id="message"
                placeholder="Type your message here..."
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
