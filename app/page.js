'use client';
import styles from './page.module.css'
import Center from './components/WordCloud_Center';
import Dark_Center from './components/WordCloud_Center_Dark';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

export default function Home() {
  
  // The set of colors to be used as backgrounds for the link cards
  const pastelColors = [
    'rgba(0, 53, 148, 1)',
    'rgba(19, 149, 186, 1)',
    'rgba(0, 126, 79, 1)',
    'rgba(92, 161, 112, 1)',
    'rgba(126, 77, 120, 1)',
    'rgba(112, 101, 155, 1)',
    'rgba(178, 34, 34, 1)',
    'rgba(166, 90, 85, 1)',
  ];

  // The set of cards with their appropriate links and details
  const [cards, setCards] = useState([]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server_url}/api/categories/`);
      const data = await res.json();
      setCards(data);
    }

    // Refresh the page when a change in color scheme is detected
    const onChange = () => {
      window.location.reload();
    }

    // Set the current color scheme
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Await a change in the color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onChange);

    fetchData();

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', onChange);
    }
  }, []);

  // Display the homepage
  return (
    <main className={styles.main}>

      {isDarkMode ? <Dark_Center /> : <Center />}

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`/board/${card.href}`}
            className={styles.card}
            style={{ backgroundColor: pastelColors[(card.id-1) % pastelColors.length] }}
            target='_self'
            rel='noopener noreferrer'
          >
            <h2>{card.name}</h2>
            <p>{card.paragraph}</p>
          </Link>
        ))}

      </div>
    </main>
  )
}
