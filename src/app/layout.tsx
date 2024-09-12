import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "wxad-drafter-api",
  description: "API for wxad-drafter",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
