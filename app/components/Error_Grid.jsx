import 'app/globals.css'
import Link from 'next/link'
import styles from './Error_Grid.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default function Error_Grid() {
    return (
        <div className={styles.grid}>
          <Link href='/'>
            <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
          </Link>
          <div>
            <h2>
              {/* Will be updated to reflect column name from database */}
              404 Error - Not Found
            </h2>
            <p>Could not find the requested resource.</p>
          </div>
          <Link href='/new_post' passHref>
            <button className={styles.button}>New Post</button>
          </Link>
        </div>
      );
}