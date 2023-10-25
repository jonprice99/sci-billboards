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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'


const rubik = Rubik({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={open_sans.className}>
        <div className={styles.container}>
          <span>
            <div className={styles.footer_logo_container}>
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
                <a href={"/"} className={styles.vertical_line}>

                </a>
                <Link href={"/"}>
                  School of Computing and Information
                </Link>
              </div>
            </div>
          </span>
        </div>

        <div className={styles.contact_resources}>
          <div className={styles.contact}>
            <p>Information Science Building, Fifth Floor</p>
            <p>135 North Bellefield Avenue</p>
            <p>Pittsburgh, PA 15260</p>
            <br></br>
            <p>412-624-9425</p>
            <br></br>
            <p><a href="mailto:sciadmit@pitt.edu">sciadmit@pitt.edu</a></p>
          </div>


          <div className={styles.footer_links}>

            <ul className={`${styles.column} ${styles.resourcesList}`}>
              <h4>Resources</h4>
              <li>
                <a href="https://www.sci.pitt.edu/about/departments-and-programs">Departments and Programs</a>
              </li>
              <li>
                <a href="https://www.sci.pitt.edu/admissions">Admissions</a>
              </li>
              <li>
                <a href="http://courses.sci.pitt.edu/">Course Schedule</a>
              </li>
              <li>
                <a href="https://www.sci.pitt.edu/people/staff">Staff Directory</a>
              </li>
              <li>
                <br />
                <a href="https://sciatpitt.wufoo.com/forms/q1emy2a21khuibd/">Submit Web Changes</a>
              </li>
              <li>
                <a href="https://www.sci.pitt.edu/academics/degrees-and-programs">Degrees and Programs</a>
              </li>
              <li>
                <a href="https://www.registrar.pitt.edu/calendars">Academic Calendar</a>
              </li>
              <li>
                <a href="https://www.sci.pitt.edu/people">Faculty Directory</a>
              </li>
              <li>
                <a href="http://www.giveto.pitt.edu/giveSCI">Give Now</a>
              </li>

            </ul>

          </div>


          <div className={styles.socials}>
            <a href="mailto:your.email@example.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEnvelope} width={24} height={24} style={{ color: "#ffffff", }} />
            </a>

            <a href="https://www.facebook.com/SciPitt/" target="_blank" rel="noopener noreferrer">

              <FontAwesomeIcon icon={faFacebookF} width={24} height={24} style={{ color: "#ffffff", }} />
            </a>

            <a href="https://twitter.com/SciPitt" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} width={24} height={24} style={{ color: "#ffffff", }} />
            </a>

            <a href="https://www.linkedin.com/school/university-of-pittsburgh-school-of-computing-and-information/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} width={24} height={24} style={{ color: "#ffffff", }} />
            </a>

          </div>


        </div>

        <div className={styles.copyright}>
          <span>Copyright 2023 University of Pittsburgh</span>
        </div>


      </div>
    </footer>
  )
}

