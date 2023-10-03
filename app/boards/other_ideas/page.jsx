import Link from "next/link"
import styles from 'app/page.module.css'
import Image from 'next/image'

const other_ideas = () => {
    return (
      <main className={styles.main}>

      <div className={styles.grid}>
        <a>
          <h2>
            Other Ideas Board
          </h2>
          <p>(Construction in progress...)</p>
        </a>
      </div>
    </main>)
  }
  
export default other_ideas