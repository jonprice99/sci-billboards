import 'app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import styles from 'app/page.module.css'
import DarkLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Secondary_Reverse_2-Color.png'
import DarkSeal from 'public/Shield_White.png'
import LightSeal from 'public/Shield_Black.png'

export default function Center() {
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