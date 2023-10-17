'use client';
import Link from "next/link"
import styles from 'app/boards/Board.module.css'
import Image from 'next/image'

const career_services = () => {
    return (
      <main className={styles.main}>

      <div className={styles.grid}>
        <Link href='/'>
            <h3>◀ Back to Home</h3>
          </Link>
        <div>
          <h2>
            Career Services
          </h2>
          <p>(Construction in progress...)</p>
        </div>
        <Link href='/new_post' passHref>
          <button className={styles.button}>New Post</button>
        </Link>
      </div>
    </main>)
  }
  
export default career_services