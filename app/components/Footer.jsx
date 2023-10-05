/**
 * This file is the footer component that's added to layout.js
 */
import styles from './Footer.module.css'
import 'app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import DarkLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Secondary_Reverse_2-Color.png'
import { Rubik } from 'next/font/google'  // Primary Pitt font
import { Open_Sans } from 'next/font/google'  // Secondary Pitt font

const rubik = Rubik({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Footer() {
    return (
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
    )
}