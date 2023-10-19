'use client';
import Link from "next/link"
import styles from 'app/boards/Board.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faMessage, faFlag, faArrowLeft, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const career_services = () => {
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
  
  const [cards, setCards] = useState([
    {
      href: '',
      header: 'Example #1',
      paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi molestias iste autem tenetur accusamus voluptates inventore laborum maxime nostrum. Impedit dignissimos doloremque, porro quia reprehenderit accusamus similique deserunt optio magnam.',
    },
    {
      href: '',
      header: 'Example #2',
      paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi molestias iste autem tenetur accusamus voluptates inventore laborum maxime nostrum. Impedit dignissimos doloremque, porro quia reprehenderit accusamus similique deserunt optio magnam.',
    },
    {
      href: '',
      header: 'Example #3',
      paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi molestias iste autem tenetur accusamus voluptates inventore laborum maxime nostrum. Impedit dignissimos doloremque, porro quia reprehenderit accusamus similique deserunt optio magnam.',
    },
  ]);
  
  return (
    <main className={styles.main}>

      <div className={styles.grid}>
        <Link href='/'>
          <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
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

      {/* This is where the posts will be displayed in a card format similar to homepage */}
      <div className={styles.post_grid}>
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className={styles.card}
            style={{ backgroundColor: pastelColors[index % pastelColors.length] }}
            target='_self'
            rel='noopener noreferrer'
          >
            <h2>{card.header}</h2>
            <p>{card.paragraph}</p>
            <footer>
              <counter>
              <FontAwesomeIcon icon={faThumbsUp} size="xl" style={{color: "#ffffff",}} /><br />12
              </counter>
              <counter>
              <FontAwesomeIcon icon={faMessage} flip="horizontal" size="xl" style={{color: "#ffffff",}} /><br />3
              </counter>
              <counter>
              <FontAwesomeIcon icon={faFlag} size="xl" style={{color: "#ffffff",}} />
              </counter>
            </footer>
          </Link>
        ))}

      </div>
    </main>)
}

export default career_services