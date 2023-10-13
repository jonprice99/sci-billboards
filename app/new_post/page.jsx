import Link from "next/link"
import styles from 'app/page.module.css'
import Image from 'next/image'

const new_post = () => {
    return (
      <main className={styles.main}>

      <div className={styles.grid}>
        <a>
          <h2>
            Create New Post
          </h2>
          <p>(Construction in progress...)</p>
        </a>
      </div>
    </main>)
  }
  
export default new_post