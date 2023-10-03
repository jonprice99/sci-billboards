import Link from "next/link"
import styles from 'app/page.module.css'
import Image from 'next/image'

const events = () => {
    return (
      <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a>
          <h2>
            Events Board
          </h2>
          <p>(Construction in progress...)</p>
        </a>
      </div>
    </main>)
  }
  
export default events