import type { Metadata } from "next"

import "./main.css"

export const metadata: Metadata = {
  title: "PersonaCraft",
  description: "",
  applicationName: "PersonaCraft",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
