'use client';
import Link from "next/link"
import styles from 'app/board/Board.module.css'
import Center from 'app/components/Home_Center';
import Error_Grid from 'app/components/Error_Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Select } from "react-dropdown-select";
import Dropdown from 'app/board/Dropdown.js';
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

// get sort dropdown values
const sortOptions = [
  {
    value: "recent",
    label: "Most Recent",
  },
  {
    value: "leastRecent",
    label: "Least Recent",
  },
  {
    value: "upvoted",
    label: "Most Upvoted"
  },
  {
    value: "leastUpvoted",
    label: "Least Upvoted"
  }
];

<Select options={sortOptions} onChange={(values) => setSelectedSortValues(values)} />

// get filter dropdown values
const filterOptions = [
  {
    value: "notProgressed",
    label: "Not in progress",
  },
  {
    value: "inTalks",
    label: "In talks"
  },
  {
    value: "inProgress",
    label: "In progress",
  },
  {
    value: "complete",
    label: "Complete"
  }
];
<Select options={filterOptions} onChange={(values) => setSelectedFilterValues(values)} />


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
  const [buttonFloat, setButtonFloat] = useState(false);
  const [selectedSortValues, setSelectedSortValues] = useState([]);
  const [selectedFilterValues, setSelectedFilterValues] = useState([]);
  const [allUpvotes, setAllUpvotes] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  let alertDisplayed = false;

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
          setAllPosts(cardData);

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

      // Get the User_Upvotes data
      const upvotesResponse = await fetch(`${server_url}/api/user_upvotes`);
      const upvotesData = await upvotesResponse.json();
      setAllUpvotes(upvotesData);
    }

    fetchData();

    //create floating new post button
    function handleScroll() {
      if (innerWidth > 700 && window.scrollY > 250) {
        setButtonFloat(true);
      }
      else {
        setButtonFloat(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [params]);

  // Function for the post flag button
  function FlagButton({ category_id, post_id }) {
    const router = useRouter();

    // No need to authenticate user here since that's done in flag_post page
    const handleClick = () => {
      router.push(`/flag_post?category_id=${category_id}&post_id=${post_id}`, { shallow: false });
    };

    return (
      <button onClick={handleClick} className={styles.iconButton}>
        <FontAwesomeIcon icon={faFlag} size="xl" style={{ color: "#ffffff", }} />
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
          // See if the user is trying to upvote their own post
          const userPost = allPosts.find(item => item.category_id === category_id && item.post_id === post_id && item.poster_name.toUpperCase() === loginCookie.toUpperCase());
          
          if (!userPost) {
            // Check if the user has upvoted this post or not
            const upvotedObject = allUpvotes.find(item => item.category_id === category_id && item.post_id === post_id && item.username.toUpperCase() === loginCookie.toUpperCase());

            if (upvotes === upvoteCount) {
              //if user, post_id, category_id not in User_Upvotes
              if (!upvotedObject) {
                // Increment the local count
                setUpvotes(upvotes + 1);
                upvoteCount++;
                setUpvotes(upvoteCount);
                //console.log(upvotes);

                // Increment the database count
                const response = await fetch(`${server_url}/api/posts/inc_upvote/${category_id}/${post_id}`, {
                  method: "PATCH"
                });
                //console.log(response);

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

                  //console.log("Success:", addResponse);
                  //router.refresh();
                } catch (error) {
                  // There was an error when trying to post to the db
                  console.error("Error when attempting to post to db:", error);
                }
              } else {
                // Decrement the local count
                setUpvotes(upvotes - 1)
                upvoteCount--;

                // Decrement the database count
                const response = await fetch(`${server_url}/api/posts/dec_upvote/${category_id}/${post_id}`, {
                  method: "PATCH",
                });
                //console.log(response);

                // Remove the upvote from the User_Upvotes table
                let username = getCookie('pittID');

                // Get the current data for the board
                try {
                  // Send the DELETE request to remove the category from the db
                  const deleteResponse = await fetch(`${server_url}/api/user_upvotes/delete/${category_id}/${post_id}/${username}`, {
                    method: "DELETE"
                  });

                  //console.log("Success:", deleteResponse);
                  //router.refresh();
                } catch (error) {
                  console.error("Error:", error);
                }
              }
            } else {
              if (upvotes < upvoteCount) {
                // User just downvoted & wants to upvote, const didn't update
                setUpvotes(upvoteCount);
                //console.log("upvotedObject: " + upvotedObject)
                //console.log("upvotes: " + upvotes)
                //console.log("upvoteCount: " + upvoteCount)

                // Increment the database count
                const response = await fetch(`${server_url}/api/posts/inc_upvote/${category_id}/${post_id}`, {
                  method: "PATCH"
                });
                //console.log(response);

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

                  //console.log("Success:", addResponse);
                  //router.refresh();
                } catch (error) {
                  // There was an error when trying to post to the db
                  console.error("Error when attempting to post to db:", error);
                }
              } else {
                // User just upvoted & wants to downvote, const didn't update
                setUpvotes(upvoteCount);
                //console.log("upvotedObject: " + upvotedObject)
                //console.log("upvotes: " + upvotes)
                //console.log("upvoteCount: " + upvoteCount)

                // Decrement the database count
                const response = await fetch(`${server_url}/api/posts/dec_upvote/${category_id}/${post_id}`, {
                  method: "PATCH",
                });
                //console.log(response);

                // Remove the upvote from the User_Upvotes table
                let username = getCookie('pittID');

                // Get the current data for the board
                try {
                  // Send the DELETE request to remove the category from the db
                  const deleteResponse = await fetch(`${server_url}/api/user_upvotes/delete/${category_id}/${post_id}/${username}`, {
                    method: "DELETE"
                  });

                  //console.log("Success:", deleteResponse);
                  //router.refresh();
                } catch (error) {
                  console.error("Error:", error);
                }
              }
            }
          } else {
            if (!alertDisplayed) {
              // Block the user from trying to upvote their own post
              alert("You can't upvote your own post!");
              alertDisplayed = true;
            } else {
              // The alert's been displayed, so we can reset the flag
              alertDisplayed = false;
            }
          }
        } else {
          if (!alertDisplayed) {
            // The user is logged in, but not authorized, so they must be disallowed
            alert("You are currently unable to upvote posts. Please contact administration for assistance.");
            alertDisplayed = true;
          } else {
            // The alert's been displayed, so we can reset the flag
            alertDisplayed = false;
          }
        }
      } else {
        if (!alertDisplayed) {
          // The user isn't logged in
          alert("You need to be logged in to upvote ideas!")
          alertDisplayed = true;
        } else {
          // The alert's been displayed, so we can reset the flag
          alertDisplayed = false;
        }
      }
    };

    return (
      <counter>
        <button onClick={handleClick} className={styles.iconButton}>
          <FontAwesomeIcon icon={faThumbsUp} size="xl" style={{ color: "#ffffff", }} />
        </button>
        <br />
        {upvotes}
      </counter>
    )
  }

  // Function that creates the search bar for the category
  function SearchBar({ onSearch }) {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
      onSearch(searchQuery);
    };

    const handleChange = (e) => {
      setSearchQuery(e.target.value);
    };

    return (
      < div className={styles.searchBar} >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div >
    );
  }

  // Function to handle sorting the posts
  function handleSort({ sortBy }) {
    // Sort by most recent
    if (sortBy === 'recent') {
      let mostRecent = allPosts.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));

      setCards(mostRecent);
    }

    // Sort by least recent
    if (sortBy === 'leastRecent') {
      let leastRecent = allPosts.sort((a, b) => new Date(a.date_posted) - new Date(b.date_posted));

      setCards(leastRecent);
    }

    // Sort by most upvotes
    if (sortBy == 'upvoted') {
      let mostUpvotes = allPosts.sort((a, b) => new b.upvotes - new a.upvotes);

      setCards(mostUpvotes);
    }

    // Sort by least upvotes
    if (sortBy == 'leastUpvoted') {
      let leastUpvotes = allPosts.sort((a, b) => new a.upvotes - new b.upvotes);

      setCards(leastUpvotes);
    }

    // Sort by most comments
    if (sortBy == 'comments') {
      let mostComments = allPosts.sort((a, b) => new b.comments - new a.comments);

      setCards(mostComments);
    }

    // Sort by least comments
    if (sortBy == 'leastComments') {
      let leastComments = allPosts.sort((a, b) => new a.comments - new b.comments);

      setCards(leastComments);
    }
  }

  // Function to handle filtering the posts by progress
  function handleFilter({ filterBy }) {
    // Filter by only "not in progress"
    if (filterBy == "notProgressed") {
      let filteredPosts = allPosts.filter(post => post.category === 0);

      setCards(filteredPosts);
    }

    // Filter by only "in talks"
    if (filterBy == "inTalks") {
      let filteredPosts = allPosts.filter(post => post.category === 1);

      setCards(filteredPosts);
    }

    // Filter by only "in progress"
    if (filterBy == "inProgress") {
      let filteredPosts = allPosts.filter(post => post.category === 2);

      setCards(filteredPosts);
    }

    // Filter by only "complete"
    if (filterBy == "complete") {
      let filteredPosts = allPosts.filter(post => post.category === 3);

      setCards(filteredPosts);
    }
  }

  // Function to handle searching title/description of posts
  function handleSearch({ searchTerm }) {
    let foundPosts = allPosts.filter(post => post.title.includes(searchTerm) || post.description.includes(searchTerm) || post.keywords.includes(searchTerm));

    setCards(foundPosts);
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
        <div>
          {buttonFloat && (
            <Link href='/new_post' passHref>
              <button className={styles.postButtonFloating}>
                <FontAwesomeIcon icon={faPlus} size="xl" style={{ color: "#ffffff", }} />
              </button>
            </Link>
          )}
          {!buttonFloat && (
            <Link href='/new_post' passHref>
              {/* <button className={styles.button + ' ' + buttonClass}>New Post</button> */}
              <button className={styles.button}>New Post</button>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.interactions}>
        <div className={styles.search}>
          <SearchBar onSearch={(query) => handleSearch(query)} />
        </div>

        <div className={styles.dropDown}>
          <div className={styles.sortDropDown}>
            <Dropdown
              options={sortOptions}
              onChange={(value) => handleSort(value)}
              defaultPlaceholder="Sort by"
              style={{ color: 'grey' }}
              values={selectedSortValues}
            />
          </div>

          <div className={styles.filterDropDown}>
            <Dropdown
              options={filterOptions}
              onChange={(value) => handleFilter(value)}
              defaultPlaceholder="Filter by"
              style={{ color: 'grey' }}
              values={selectedFilterValues}
            />
          </div>

        </div>

      </div>

      <div className={styles.post_grid}>
        {cards.map((card) => (
          <div key={card.post_id} className={styles.card} style={{ backgroundColor: pastelColors[(card.post_id - 1) % pastelColors.length] }}>
            <Link
              href={`/board/${href}/${card.post_id}`}
              target='_self'
              rel='noopener noreferrer'
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </Link>

            <footer className={styles.cardFooter}>
              <counter>
                <UpVoteButton category_id={card.category_id} post_id={card.post_id} upvoteCount={card.upvotes} />
              </counter>
              <counter>
                <FontAwesomeIcon icon={faMessage} flip="horizontal" size="xl" style={{ color: "#ffffff", }} /><br />{card.comments}
              </counter>
              <FlagButton category_id={card.category_id} post_id={card.post_id} upvotes={card.upvotes} />
            </footer>
          </div>
        ))}

      </div>
    </main>)
}
