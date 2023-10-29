'use client';
import Link from "next/link"
import styles from 'app/board/Board.module.css'
import Image from 'next/image'
import Center from 'app/components/Home_Center';
import Error_Grid from 'app/components/Error_Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';

const server_url = `http://127.0.0.1:8000`;

export default function Page({ params, searchParams }) {
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

  const [name, setName] = useState('')
  const [paragraph, setParagraph] = useState('')
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${server_url}/api/categories/${params.category}`);
        const data = await response.json();
        setName(data.name);
        setParagraph(data.paragraph);

        //const cardResponse = await fetch(`${server_url}/api/posts/${data.id}`);
        //const cardData = await cardResponse.json();
        //setCards(cardData.cards);
        //console.log(cardData);
      } catch (error) {
        setError(true);
      }
      
    }

    fetchData();
  }, [params]);

  if (error) {
    return (
      <main className={styles.main}>
        <Error_Grid />
      </main>
    )
  }
  
  return (
    <main className={styles.main}>

      <div className={styles.grid}>
        <Link href='/'>
          <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
        </Link>
        <div className={styles.title}>
          <h2>
            {/* Will be updated to reflect column name from database */}
            {name}
          </h2>
          <p>{paragraph}</p>
        </div>
        <Link href='/new_post' passHref>
          <button className={styles.button}>New Post</button>
        </Link>
      </div>

      {/* Note: Will be updated to show posts from postsData */}
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
              <FontAwesomeIcon icon={faThumbsUp} size="xl" style={{color: "#ffffff",}} /><br />{card.upvotes}
              </counter>
              <counter>
              <FontAwesomeIcon icon={faMessage} flip="horizontal" size="xl" style={{color: "#ffffff",}} /><br />{card.comments}
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