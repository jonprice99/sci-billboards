/**
 * This is where each post and its details
 * will be presented in its own page
 */

'use client';
import Link from "next/link"
import styles from 'app/board/[category]/[post]/Board.module.css'
import Center from 'app/components/Home_Center';
import Error_Grid from 'app/components/Error_Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

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

    const [cards, setCards] = useState([]);
    const [title, setTitle] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [posterName, setPosterName] = useState('');
    const [progress, setProgress] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(false);
    const [categoryID, setCategoryID] = useState(0);
    const [upvotes, setUpvotes] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    let progressText;
    let catData;

    // Hold the User_Upvotes table data
    const [allUpvotes, setAllUpvotes] = useState([]);

    useEffect(() => {
        // Get the necessary data from the database
        async function fetchData() {
            try {
                // Get the post details
                const catRes = await fetch(`${server_url}/api/categories/${params.category}`);
                catData = await catRes.json();
                setCategoryID(catData.id);
                const response = await fetch(`${server_url}/api/posts/${catData.id}/${params.post}`);
                const data = await response.json();
                setTitle(data.title);
                setParagraph(data.description);
                setProgress(data.progress);
                setUpvotes(data.upvotes);
                setCommentCount(data.comment_count);

                // Set the appropriate date
                const date = new Date(data.date_posted);
                const localDate = new Date(date.getTime());
                const estDate = localDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
                setDate(estDate)

                // Set the appropriate poster name
                if (data.showName == false) {
                    setPosterName("Anonymous")
                } else {
                    setPosterName(data.poster_name)
                }

            } catch (error) {
                setError(true);
            }

            // Get the User_Upvotes data
            const upvotesResponse = await fetch(`${server_url}/api/user_upvotes/`);
            const upvotesData = await upvotesResponse.json();
            setAllUpvotes(upvotesData);

            // Get the comments for this post
            const cardResponse = await fetch(`${server_url}/api/comments/${catData.id}/${params.post}`);
            const cardData = await cardResponse.json();
            setCards(cardData);
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
        progressText = "In progress";
    } else if (progress === 3) {
        progressText = "Implemented";
    }

    // Function for the post flag button
    function FlagButton({ category_id, post_id }) {
        const router = useRouter();

        // No need to authenticate user here since it's done in flag_post
        const handleClick = () => {
            router.push(`/flag_post?category_id=${category_id}&post_id=${post_id}`,);
        };

        return (
            <button onClick={handleClick} className={`${styles.iconButton} ${styles.flagButton}`}>
                <FontAwesomeIcon icon={faFlag} size="xl" />
            </button>
        )
    }

    // Function for the upvote button
    function UpVoteButton({ category_id, post_id, upvoteCount }) {
        const router = useRouter();
        const [upvotes, setUpvotes] = useState(upvoteCount);

        const handleClick = async () => {
            let loginCookie = getCookie('pittID');
            let authorizeCookie = getCookie('authorization');

            // Check if the user is logged in
            if (loginCookie != undefined) {
                // Check if the user is authorized to upvote
                if (authorizeCookie != undefined) {
                    // Check if the user has upvoted this post or not
                    const upvotedObject = allUpvotes.find(item => item.category_id === category_id && item.post_id === post_id && item.username.toUpperCase() === username.toUpperCase());

                    if (upvotes === upvoteCount) {
                        //if user, post_id, category_id not in User_Upvotes
                        if (!upvotedObject) {
                            // Increment the local count
                            setUpvotes(upvotes + 1);

                            // Increment the database count
                            const response = await fetch(`${server_url}/api/posts/inc_upvote/${category_id}/${post_id}`, {
                                method: "PATCH"
                            });
                            console.log(response);

                            // Add the upvote to the User_Upvotes table for tracking
                            let username = getCookie('pittID');
                            const data = { category_id, post_id, username }

                            try {
                                const addResponse = await fetch(`${server_url}/api/user_upvotes/add`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(data)
                                });

                                console.log("Success:", addResponse);
                                //router.refresh();
                            } catch (error) {
                                // There was an error when trying to post to the db
                                console.error("Error when attempting to post to db:", error);
                            }
                        }
                    } else {
                        // if user, post_id, category_id in User_Upvotes
                        if (upvotedObject) {
                            // Decrement the local count
                            setUpvotes(upvotes - 1)

                            // Decrement the database count
                            const response = await fetch(`${server_url}/api/posts/dec_upvote/${category_id}/${post_id}`, {
                                method: "PATCH",
                            });
                            console.log(response);

                            // Remove the upvote from the User_Upvotes table
                            let username = getCookie('pittID');

                            // Get the current data for the board
                            try {
                                // Send the DELETE request to remove the category from the db
                                const deleteResponse = await fetch(`${server_url}/api/user_upvotes/delete/${category_id}/${post_id}/${username}`, {
                                    method: "DELETE"
                                });

                                console.log("Success:", deleteResponse);
                                //router.refresh();
                            } catch (error) {
                                console.error("Error:", error);
                            }
                        }
                    }
                } else {
                    // The user is logged in, but not authorized, so they must be disallowed
                    alert("You are currently unable to upvote posts. Please contact administration for assistance.");
                }
            } else {
                // The user isn't logged in
                alert("You need to be logged in to upvote ideas!")
            }
        };

        return (
            <counter>
                <button onClick={handleClick} className={styles.iconButton}>
                    <FontAwesomeIcon icon={faThumbsUp} size="xl" />
                </button>
                <br />
                {upvotes}
            </counter>
        )
    }

    return (
        <main className={styles.main}>
            {/* The grid under the header that contains back button, board name, new post button, search, sort, and filter tools */}
            <div className={styles.grid}>
                <Link href={`/board/${params.category}`}>
                    <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Board</h3>
                </Link>
                <div className={styles.title}>
                    <h2>
                        {title}
                    </h2>
                    <p>
                        {posterName}
                    </p>

                </div>
                <div className={styles.progressText}>
                    <h4>
                        Status: {progressText}
                    </h4>
                </div>
            </div>
            <div className={styles.paragraph}>
                <h3>
                    {paragraph}
                </h3>
            </div>

            <div className={styles.extraInfo}>
                <div className={styles.dateInfo}>
                    <counter className={styles.iconWrapper}>
                        <UpVoteButton category_id={categoryID} post_id={params.post} upvoteCount={upvotes} />
                        <FlagButton category_id={categoryID} post_id={params.post} />
                    </counter>
                </div>

                <div className={styles.dateInfo}>
                    <h5>
                        {date}
                    </h5>
                </div>
            </div>

            <div className={styles.commentsTitle}>
                <div className="commentsInfo">
                    <h4>
                        <FontAwesomeIcon icon={faMessage} flip="horizontal" size="xl" style={{ marginRight: "10px" }}></FontAwesomeIcon>
                        Comments
                    </h4>
                </div>
            </div>

            <div className={styles.post_grid}>
                {cards.map((card) => (
                    <div key={params.post} className={styles.card} style={{ backgroundColor: pastelColors[(params.post - 1) % pastelColors.length] }}>
                        <h2>{card.user_name}</h2>
                        <p>{card.body}</p>
                        <p>{card.comment_date}</p>
                    </div>
                ))}

            </div>
        </main>
    )
}
