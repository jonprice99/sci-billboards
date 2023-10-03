import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import styles from 'app/page.module.css'
import DarkLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Secondary_Reverse_2-Color.png'
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
      <body className={rubik.className}>
        <header className={styles.header}>
          <div className={styles.logo}>
              <Link href={"/"}>
                <picture>
                    <Image
                    className={styles.logo}
                    src={DarkLogo}
                    alt="University of Pittsburgh Logo"
                    width={200}
                    height={76}
                    priority
                    />
                </picture>
              </Link>
          </div>

          <div className={styles.header_text}>
            <h1>
              What do you want?
            </h1>
          </div>
        </header>
        
        {children}
      </body>
    </html>
  )
}
