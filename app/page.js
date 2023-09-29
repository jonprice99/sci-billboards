import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      </div>

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
        <a
          href="/boards/career_services"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Career Services <span>-&gt;</span>
          </h2>
          <p>Give your thoughts on our career assistance/opportunity resources here!</p>
        </a>

        <a
          href="/boards/classes"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Classes <span>-&gt;</span>
          </h2>
          <p>Feedback about existing classes? Give it here!</p>
        </a>

        <a
          href="/boards/classes"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Classrooms <span>-&gt;</span>
          </h2>
          <p>Is there room for improvement with our classrooms? Tell us here!</p>
        </a>

        <a
          href="/boards/community"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Community <span>-&gt;</span>
          </h2>
          <p>Thoughts on SCI culture or social life? Tell us how you feel!</p>
        </a>

        <a
          href="/boards/curriculum"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Curriculum <span>-&gt;</span>
          </h2>
          <p>Think our curriculum needs some updating? Let us know here!</p>
        </a>

        <a
          href="/boards/events"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Events <span>-&gt;</span>
          </h2>
          <p>Give us your thoughts on past events or ideas for new ones here!</p>
        </a>

        <a
          href="/boards/lounges"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Lounges <span>-&gt;</span>
          </h2>
          <p>Want better places to take it easy at SCI? Drop some ideas here!</p>
        </a>

        <a
          href="/boards/misc"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Miscellaneous <span>-&gt;</span>
          </h2>
          <p>Got some random thoughts for SCI? We want them here!</p>
        </a>

        <a
          href="/boards/other_ideas"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Other Ideas <span>-&gt;</span>
          </h2>
          <p>Have other ideas that don't fit elsewhere? We got you!</p>
        </a>

      </div>
    </main>
  )
}
