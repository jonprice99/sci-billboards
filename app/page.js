import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import DarkLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Secondary_Reverse_2-Color.png'
import LightLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Primary_3-Color.png'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <Link href={"/"}>
          <picture>
            <source srcSet={DarkLogo.src} media="(prefers-color-scheme: dark)"/>
            <Image
              className={styles.logo}
              src={LightLogo}
              alt="Next.js Logo"
              width={200}
              height={76}
              priority
            />
          </picture>
        </Link>
      </div>

      <div className={styles.grid}>
        <a
          href="/boards/trending"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            🔥 Trending 
          </h2>
          <p>See what ideas are hot and current here!</p>
        </a>
        
        <a
          href="/boards/career_services"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            🧑‍💼 Career Services 
          </h2>
          <p>Tell your thoughts on our career resources!</p>
        </a>

        <a
          href="/boards/classes"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            🧑‍💻 Classes 
          </h2>
          <p>Have feedback about current and existing classes? Give it here!</p>
        </a>

        <a
          href="/boards/classes"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            🏫 Classrooms 
          </h2>
          <p>Is there room for improvement with our classrooms? Tell us here!</p>
        </a>

        <a
          href="/boards/community"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            🌐 Community 
          </h2>
          <p>Thoughts on SCI culture or social life? Let us know how you feel!</p>
        </a>

        <a
          href="/boards/curriculum"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            📚 Curriculum 
          </h2>
          <p>Think our curriculum needs some updating? Let us know!</p>
        </a>

        <a
          href="/boards/events"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            📅 Events 
          </h2>
          <p>Give us your thoughts on past events or ideas for new ones!</p>
        </a>

        <a
          href="/boards/lounges"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            🛋️ Lounges 
          </h2>
          <p>Want better places to take it easy at SCI? Drop us some thoughts!</p>
        </a>

        <a
          href="/boards/misc"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            🦆 Miscellaneous 
          </h2>
          <p>Got some random thoughts for SCI? We want them!</p>
        </a>

        <a
          href="/boards/other_ideas"
          className={styles.card}
          target="_self"
          rel="noopener noreferrer"
        >
          <h2>
            💭 Other Ideas 
          </h2>
          <p>Have other ideas that don't fit elsewhere? We got you!</p>
        </a>

      </div>
    </main>
  )
}
