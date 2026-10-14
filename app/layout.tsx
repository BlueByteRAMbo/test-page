import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Eextramile AI — 300 Recruiter Emails Before Lunch | Automated Job Outreach',
  description: 'Verified recruiter emails, AI-personalized outreach, automated end-to-end — delivered straight to your Gmail for every application you send.',
  keywords: ['recruiter outreach', 'job search automation', 'cold email recruiters', 'AI job applications', 'Eextramile AI'],
  authors: [{ name: 'Eextramile AI' }],
  openGraph: {
    title: 'Eextramile AI — Concept 3 Sheets',
    description: 'An immersive, minimalist 3D paper-stack experience representing your entire job outreach pipeline.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f4f3ef] text-[#111111] antialiased selection:bg-[#dcfce7] selection:text-[#15803d]">
        {children}
      </body>
    </html>
  )
}
