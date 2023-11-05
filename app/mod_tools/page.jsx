'use client';
import styles from './ModTools.module.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const server_url = `http://127.0.0.1:8000`;

export default function ModTools() {

    // The set of cards with their appropriate links and details
    const cards = [
        {
            href: '/mod_tools/boards',
            className: styles.card,
            target: '_self',
            rel: 'noopener noreferrer',
            header: 'Boards',
            parargraph: 'Control adding, editing or deleting a board category'
        },
        {
            href: '/mod_tools/users',
            className: styles.card,
            target: '_self',
            rel: 'noopener noreferrer',
            header: 'Users',
            parargraph: 'Control and ban powers to users'
        },
        {
            href: '/mod_tools/posts',
            className: styles.card,
            target: '_self',
            rel: 'noopener noreferrer',
            header: 'Posts',
            parargraph: 'Control hiding and deleting a post'
        },
        {
            href: '/mod_tools/comments',
            className: styles.card,
            target: '_self',
            rel: 'noopener noreferrer',
            header: 'Comments',
            parargraph: 'Control deleting and commenting privileges'
        },
    ]


    return (
        <main className={styles.main}>
            <div className={styles.grid}>
                <Link href='/'>
                    <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
                </Link>
                <div className={styles.title}>
                    <h2>
                        Mod Tools
                    </h2>
                    <p>Manage the Idea Board</p>
                </div>
                <div></div>
            </div>

            <div className={styles.tool_grid}>
                {cards.map((card, index) => (
                    <a
                        key={index}
                        href={card.href}
                        className={card.className}
                        style={{ backgroundColor: '#003594' }}
                        target={card.target}
                        rel={card.rel}
                    >
                        <h2>{card.header}</h2>
                        <p>{card.parargraph}</p>
                    </a>
                ))}

            </div>
        </main>
    )
}
