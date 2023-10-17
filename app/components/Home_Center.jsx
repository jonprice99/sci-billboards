/**
 * This is the file where the word cloud for the homepage HTML
 * is located. (Currently just a Pitt Logo placeholder...)
 */

import 'app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Home_Center.module.css'
import DarkSeal from 'public/Shield_White.png'
import LightSeal from 'public/Shield_Black.png'

export default function Home_Center() {
    return (
        <div className={styles.center}>
          <Link href={"/"}>
            <picture>
              <source srcSet={DarkSeal.src} media="(prefers-color-scheme: dark)"/>
              <Image
                className={styles.logo}
                src={LightSeal}
                alt="Pitt Seal (Placeholder)"
                width={80}
                height={100}
                priority
              />
            </picture>
          </Link>
        </div>
    )
}