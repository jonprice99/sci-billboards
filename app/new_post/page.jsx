'use client';
import Link from "next/link"
import styles from './NewPost.module.css'
import Image from 'next/image'
import AutoResize from 'react-textarea-autosize';
import Home_Center from "../components/Home_Center";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;
const poster_id = 1;  // To be replaced with mock login function info
const poster_name = 'Roc' // To be replaced with mock login function info

const new_post = () => {
  const router = useRouter();
  
  // Constant to set the character limit of the post title
  const title_limit = 160;
  const descript_limit = 2048;

  const [titleCount, setTitleCount] = useState(0);
  const [descriptCount, setPostBodyCount] = useState(0);

  const [categoryStr, setCategoryStr] = useState('');
  const [title, setTitle] = useState('');
  const [description, setPostBody] = useState('');
  const [showName, setShowName] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server_url}/api/categories/`);
      const data = await res.json();
      setCategories(data.filter(item => item.name != 'Trending'));
    }

    fetchData();
  }, []);

  // Define a function that handles the form submission
  async function handleSubmit(event) {
    // Prevent the default browser behavior
    event.preventDefault();

    // Get the numerical version of the category id
    let category_id = Number(categoryStr)

    // Prevent the user from being able to send a blank post
    if (category_id == 0 || title.length < 1 || description.length < 1) {
      router.push(`/new_post`);
    }

    //Set the form data so we can send it to the Django API
    let data;
    if (!showName) {
      // We're keeping the post anonymous
      data = { category_id, title, description, poster_id };
    } else {
      // We're adding a name to the post
      data = { category_id, title, description, poster_id, poster_name }
    }

    // Get the category href we're posting to so we can put it in the router
    let selected_href = (categories.filter(item => item.id == category_id)).map((item) => item.href)

    // Submit the form data to the database
    try {
      const addResponse = await fetch(`${server_url}/api/posts/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      console.log("Success:", addResponse);
      router.push(`/board/${selected_href}`);
    } catch (error) {
      // There was an error when trying to post to the db
      console.error("Error when attempting to post to db:", error);
      router.refresh();
    }
  }

  // Function to handle title character count
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleCount(e.target.value.length);
  };

  // Function to handle body character count
  const handlePostBodyChange = (e) => {
    setPostBody(e.target.value);
    setPostBodyCount(e.target.value.length);
  };

  // Function to handle show poster name change
  const handleShowPosterNameChange = () => {
    var checkbox = document.getElementById("showPosterName");
    setShowName(checkbox.checked);
  }

  return (
    <main className={styles.main}>

      <div className={styles.grid}>
        <Link href='/'>
        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
        </Link>
        <div>
          <h2>
            New Post
          </h2>
          <p>Enter your feedback for us below...</p>
        </div>
          <div />
      </div>

      <Home_Center />

      <div className={styles.post_form}>
        {/* Note: Need to update this so it will post to database */}
        <form method="post">
        <label htmlFor="category">Category:</label>
          <br />
          <select id="category" value={categoryStr} onChange={(e) => setCategoryStr(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <br></br>
          <br></br>
          <label htmlFor="title">Summarize your feedback:</label>
          <p>{`Characters left: ${title_limit - titleCount}`}</p>
          <AutoResize
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            maxLength={title_limit}
            required
          />
          <br></br>
          <br></br>
          <label htmlFor="post_body">Give additional details:</label>
          <p>{`Characters left: ${descript_limit - descriptCount}`}</p>
          <textarea
            id="post_body"
            value={description}
            onChange={handlePostBodyChange}
            maxLength="2048"
            rows={10}
            required
          />
          <br />
          <br />
          <input type="checkbox" id="showPosterName" value={showName} onChange={handleShowPosterNameChange}></input>
          <label htmlFor="showPosterName">Display your name on this post</label>
        </form>
      </div>
      <br />
      <button className={styles.button} type="submit" onClick={handleSubmit}>Submit</button>
    </main>)
}

export default new_post