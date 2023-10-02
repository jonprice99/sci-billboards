import './globals.css'
import { Inter } from 'next/font/google'  // Default Next font
import { Rubik } from 'next/font/google'  // Primary Pitt font
import { Open_Sans } from 'next/font/google'  // Secondary Pitt font
import { Merriweather } from 'next/font/google' // Tertiary Pitt font

const inter = Inter({ subsets: ['latin'] })
const rubik = Rubik({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'School of Computing and Information - "What Do You Want?" Board',
  description: "Virtual billboards for the University of Pittsburgh's School of Computing and Information to field ideas, projects, suggestions, and feedback from guests, students, staff, and faculty.",
  keywords: 'Pitt, University of Pittsburgh, SCI, School of Computing and Information, feedback, What Do You Want'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
