'use client';
import styles from './ModTools.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
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
        },
        {
            href: '/mod_tools/users',
            className: styles.card,
            target: '_self',
            rel: 'noopener noreferrer',
            header: 'Users',
        },
        {
            href: '/mod_tools/posts',
            className: styles.card,
            target: '_self',
            rel: 'noopener noreferrer',
            header: 'Posts',
        },
        {
            href: '/mod_tools/comments',
            className: styles.card,
            target: '_self',
            rel: 'noopener noreferrer',
            header: 'Comments',
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
                    </a>
                ))}

            </div>
        </main>
    )
}
