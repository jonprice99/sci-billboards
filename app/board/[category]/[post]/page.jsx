/**
 * This is where each post and its details
 * will be presented in its own page
 */

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

export default function Post({ params, searchParams }) {
    // The colors of the comment cards
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

    const [cards, setCards] = ([]);
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [posterName, setPosterName] = useState('');
    const [progress, setProgress] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(false);
    let progressText;

    useEffect(() => {
        // Get the necessary data from the database
        async function fetchData() {
            try {
                // Get the post details
                const catRes = await fetch(`${server_url}/api/categories/${params.category}`);
                const catData = await catRes.json();
                const response = await fetch(`${server_url}/api/posts/${catData.id}/${params.post}`);
                const data = await response.json();
                setTitle(data.title);
                setParagraph(data.description);
                setProgress(data.progress)

                // Set the appropriate date
                const date = new Date(data.date_posted);
                const localDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
                const estDate = localDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
                setDate(estDate)
                
                // Set the appropriate poster name
                if (data.poster_name == null) {
                    setPosterName("Anonymous")
                } else {
                    setPosterName(data.poster_name)
                }

                // Get the comments for this post
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

    // Display an error page if we try to access a post that doesn't exist
    if (error) {
        return (
            <main className={styles.main}>
                <Error_Grid />
            </main>
        )
    }

    // Set the progress text that will be displayed on the page based on the progress value
    if (progress === 0) {
        progressText = "Not in progress";
    } else if (progress === 1) {
        progressText = "Being deliberated";
    } else if (progress === 2) {
        progressText = "In development";
    } else if (progress === 3) {
        progressText = "Implemented";
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
                        
                    </h2>
                    <p></p>
                </div>
                <Link href='/new_post' passHref>
                    <button className={styles.button}>New Post</button>
                </Link>
            </div>

            {/* Just some basic HTML to display the details of the post for now, needs formatted */}
            <h3>
                {title}
            </h3>

            <h4>
                {posterName}
            </h4>

            <p>
                {paragraph}
            </p>

            <br />

            <p>
                {date}
            </p>

            <br />

            <p>
                {progressText}
            </p>

            {/* Need to also include the upvote and flag buttons here */}

            {/* The comments will go here... */}
        </main>
    )
}