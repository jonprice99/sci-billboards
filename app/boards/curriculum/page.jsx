import Link from "next/link"
import styles from 'app/page.module.css'
import Image from 'next/image'

const curriculum = () => {
    return (
      <main className={styles.main}>

        <div className={styles.grid}>
        <Link href='/'>
            <h3>◀ Back to Home</h3>
          </Link>
        <div>
          <h2>
            Curriculum
          </h2>
          <p>(Construction in progress...)</p>
        </div>
        <Link href='/new_post' passHref>
          <button className={styles.button}>Submit</button>
        </Link>
      </div>
    </main>)
  }
  
export default curriculum