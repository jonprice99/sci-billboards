'use client';
import Link from "next/link"
import styles from 'app/board/Board.module.css'
import Image from 'next/image'
import Center from 'app/components/Home_Center';
import Error_Grid from 'app/components/Error_Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

export default function Page({ params, searchParams }) {
  // The colors of the cards
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
      title: 'Example #1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi molestias iste autem tenetur accusamus voluptates inventore laborum maxime nostrum. Impedit dignissimos doloremque, porro quia reprehenderit accusamus similique deserunt optio magnam.',
    },
    {
      href: '',
      title: 'Example #2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi molestias iste autem tenetur accusamus voluptates inventore laborum maxime nostrum. Impedit dignissimos doloremque, porro quia reprehenderit accusamus similique deserunt optio magnam.',
    },
    {
      href: '',
      title: 'Example #3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi molestias iste autem tenetur accusamus voluptates inventore laborum maxime nostrum. Impedit dignissimos doloremque, porro quia reprehenderit accusamus similique deserunt optio magnam.',
    },
  ]);

  const [name, setName] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [error, setError] = useState(false);
  const [href, setHref] = useState(''); // Used for post href creation

  useEffect(() => {
    // Get the necessary data from the database
    async function fetchData() {
      try {
        const response = await fetch(`${server_url}/api/categories/${params.category}`);
        const data = await response.json();
        setName(data.name);
        setParagraph(data.paragraph);
        setHref(data.href)

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

  // Function for the post flag button
  function FlagButton({ category_id, post_id}) {
    const router = useRouter();

    const handleClick = () => {
      router.push(url=`/flag_post?category_id=${category_id}&post_id=${post_id}`);
    };

    return (
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faFlag} size="xl" style={{color: "#ffffff",}} />
      </button>
    )
  }

  // Display an error page if we try to access a board that doesn't exist
  if (error) {
    return (
      <main className={styles.main}>
        <Error_Grid />
      </main>
    )
  }
  
  return (
    <main className={styles.main}>

      {/* The grid under the header that contains back button, board name, new post button, search, sort, and filter tools */}
      <div className={styles.grid}>
        <Link href='/'>
          <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
        </Link>
        <div className={styles.title}>
          <h2>
            {name}
          </h2>
          <p>{paragraph}</p>
        </div>
        <Link href='/new_post' passHref>
          <button className={styles.button}>New Post</button>
        </Link>
      </div>

      {/* Note: Will be updated to show posts from db */}
      <div className={styles.post_grid}>
        {cards.map((card, index) => (
          <Link
            key={index}
            href={`/board/${href}/${card.post_id}`}
            className={styles.card}
            style={{ backgroundColor: pastelColors[index % pastelColors.length] }}
            target='_self'
            rel='noopener noreferrer'
          >
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <footer>
              <counter>
              <FontAwesomeIcon icon={faThumbsUp} size="xl" style={{color: "#ffffff",}} /><br />{card.upvotes}
              </counter>
              <counter>
              <FontAwesomeIcon icon={faMessage} flip="horizontal" size="xl" style={{color: "#ffffff",}} /><br />{card.comments}
              </counter>
              <counter>
                <FlagButton category_id={card.category_id} post_id={card.post_id}/>
              </counter>
            </footer>
          </Link>
        ))}

      </div>
    </main>)
}