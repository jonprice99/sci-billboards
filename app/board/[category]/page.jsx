'use client';
import Link from "next/link"
import styles from 'app/board/Board.module.css'
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
  
  const [cards, setCards] = useState([]);
  const [name, setName] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [archived, setArchived] = useState(false);
  const [boardError, setBoardError] = useState(false);
  const [postError, setPostError] = useState(false);
  const [foundPosts, setFoundPosts] = useState(true);
  const [href, setHref] = useState(''); // Used for post href creation

  useEffect(() => {
    // Get the necessary data from the database
    async function fetchData() {
      // Try to get the category
      try {
        const response = await fetch(`${server_url}/api/categories/${params.category}`);
        const data = await response.json();
        setName(data.name);
        setParagraph(data.paragraph);
        setHref(data.href);
        setArchived(data.isArchived);

        // Try to get the posts
        try {
          const cardResponse = await fetch(`${server_url}/api/posts/${data.id}`);
          const cardData = await cardResponse.json();
          setCards(cardData);
          
          // Check if we have no posts for this category
          if (Object.keys(cardData).length < 1) {
            setFoundPosts(false);
          }
        } catch (error) {
          // There was an error getting the posts
          setPostError(true);
        }
      } catch (error) {
        // There was an error getting the category (i.e., it doesn't exist)
        setBoardError(true);
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
  if (boardError) {
    return (
      <main className={styles.main}>
        <Error_Grid />

        <Center />

        <h4>If you do not believe you should be seeing this error, 
          please contact the system administrator.</h4>
      </main>
    )
  }

  // Display a different page if the user attempts to access an archived board
  if (archived) {
    return (
      <main className={styles.main}>
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

        <Center />
        <h4>This category has been archived...</h4>
        <p>Only moderators and administrators may access this category right now.</p>
      </main>
    )
  }

  // Display an error page if there was a problem accessing the posts for a board
  if (postError) {
    return (
      <main className={styles.main}>
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

        <Center />
        <h4>We had a problem getting posts for this category...</h4>
        <p>Please try again later!</p>
      </main>
    )
  }

  // Display a modified page with a message for the user if no posts exist
  if (!foundPosts && name != "Trending") {
    return (
      <main className={styles.main}>
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

        <h4>Nobody's posted feedback here yet...</h4>
        <p>Why not click New Post and be the first?</p>
      </main>
    )
  }

  // Display a modified trending page with a message for the user if no posts
  if (!foundPosts && name == "Trending") {
    return (
      <main className={styles.main}>
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

        <h4>There's nothing trending right now...</h4>
        <p>Please check back in later!</p>
      </main>
    )
  }

  // Display the board with its posts
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
        {cards.map((card) => (
          <Link
            key={card.post_id}
            href={`/board/${href}/${card.post_id}`}
            className={styles.card}
            style={{ backgroundColor: pastelColors[(card.post_id-1) % pastelColors.length] }}
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