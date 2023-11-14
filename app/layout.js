/**
 * This file holds the assets and objects that are present across all pages
 * (i.e., Header, Footer)
 */

import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Inter } from 'next/font/google'  // Default Next font
import { Rubik } from 'next/font/google'  // Primary Pitt font
import { Open_Sans } from 'next/font/google'  // Secondary Pitt font
import { Merriweather } from 'next/font/google' // Tertiary Pitt font

// Hold each of the fonts
const inter = Inter({ subsets: ['latin'] })
const rubik = Rubik({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'School of Computing and Information - Idea Board',
  description: "Virtual billboards for the University of Pittsburgh's School of Computing and Information to field ideas, projects, suggestions, and feedback from guests, students, staff, and faculty.",
  keywords: 'Pitt, University of Pittsburgh, SCI, School of Computing and Information, feedback, What Do You Want, idea, Idea Board'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Header />
        
        {children}

        <Footer />
      </body>
    </html>
  )
}
