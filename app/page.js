'use client';
import styles from './page.module.css'
import Center from './components/Home_Center';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  // To be replaced with a db table
  const [cards, setCards] = useState([
    /*{
      href: '/board/trending',
      header: 'Trending',
      paragraph: 'See what ideas are hot and current here!',
    },
    {
      href: '/board/career_services',
      header: 'Career Services',
      paragraph: 'Tell your thoughts on our career resources!',
    },
    {
      href: '/board/classes',
      header: 'Classes',
      paragraph: 'Have feedback about current and existing classes? Give it here!',
    },
    {
      href: '/board/classrooms',
      header: 'Classrooms',
      paragraph: 'Is there room for improvement with our classrooms? Tell us here!',
    },
    {
      href: '/board/community',
      header: 'Community',
      paragraph: "Thoughts on SCI culture or social life? Let us know how you feel!",
    },
    {
      href: '/board/curriculum',
      header: 'Curriculum ',
      paragraph:
        "Think our curriculum needs some updating? Let us know!",
    },
    {
      href: '/board/events',
      header: 'Events ',
      paragraph:
        "Give us your thoughts on past events or ideas for new ones!",
    },
    {
      href: '/board/lounges',
      header: 'Lounges ',
      paragraph:
        "Want better places to take it easy at SCI? Drop us some thoughts!",
    },
    {
      href: '/board/misc',
      header: 'Miscellaneous ',
      paragraph:
        "Got some random thoughts for SCI? We want them!",
    },*/
  ]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://127.0.0.1:8000/api/categories/");
      const data = await res.json();
      console.log(data);
      setCards(data);
    }

    fetchData();
  }, []);
  
  /**
   * Note: To make any persistent changes to the card list, 
   * we will need to store the 
   */

  /**
   * Function to add a new card to the grid
   * @param {*} link The name of the board in the URL
   * @param {*} title The name of the board in the Card
   * @param {*} description The paragraph/description of the Card
   */
  function addCard({link, title, description}) {
    setCards([
      ...cards, 
      {
        href: `/board/${link}`,
        header: title,
        paragraph: description,
      },
    ]);
  }

  /**
   * Function to remove a card from the grid based on the title
   * @param {*} header The title of the category you wish to remove
   */
  function removeCard(header) {
    const index = cards.findIndex((card) => card.header === header);
    if (index !== -1) {
      const newCards = [...cards];
      newCards.splice(index, 1);
      setCards(newCards);
    }
  }

  /**
   * Note: We'll have to update addCard and removeCard once the db is
   * up and running so we can also add and drop tables as needed
   */

  return (
    <main className={styles.main}>

      <Center />

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`/board/${card.href}`}
            className={styles.card}
            style={{ backgroundColor: pastelColors[card.id % pastelColors.length] }}
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
