import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import styles from 'app/page.module.css'
import DarkLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Secondary_Reverse_2-Color.png'
import DarkSeal from 'public/Shield_White.png'
import LightLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Primary_3-Color.png'
import LightSeal from 'public/Shield_Black.png'
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
                    height={70}
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

        <div className={styles.center}>
          <Link href={"/"}>
            <picture>
              <source srcSet={DarkSeal.src} media="(prefers-color-scheme: dark)"/>
              <Image
                className={styles.logo}
                src={LightSeal}
                alt="Next.js Logo"
                width={80}
                height={100}
                priority
              />
            </picture>
          </Link>
        </div>
        
        {children}

        <footer className={styles.footer}>
          <div className={open_sans.className}>
              <div className={styles.container}>
                <div className={styles.footer_logo}>
                  <Image
                    src={DarkLogo}
                    alt="University of Pittsburgh Logo"
                    width={120}
                    height={40}
                    priority
                  />
                </div>
                    
                <div className={styles.footer_uni_name}>
                  <Link href={"/"}>
                    School of Computing and Information
                  </Link>
                </div>
              </div>

              <div className={styles.container}>
                <p>
                  <br></br>
                  Information Science Building, Fifth Floor
                  <br></br>
                  135 North Bellefield Avenue
                  <br></br>
                  Pittsburgh, PA 15260
                  <br></br>
                </p>
              </div>

              <div className={styles.container}>
                <ul className={styles.links}>
                  <li>
                    <a href="https://www.sci.pitt.edu/careers/career-resources/">Career Resources</a>
                  </li>
                  <li>
                    <a href="https://www.sci.pitt.edu/careers/career-faqs/">Career FAQs</a>
                  </li>
                  <li>
                    <a href="https://www.sci.pitt.edu/careers/career-outcomes/">Career Outcomes</a>
                  </li>
                </ul>
              </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
