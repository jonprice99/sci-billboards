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
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

const new_post = () => {
  const router = useRouter();

  // Constant to set the character limit of the post title
  const title_limit = 160;
  const descript_limit = 2048;

  const [titleCount, setTitleCount] = useState(0);
  const [descriptCount, setPostBodyCount] = useState(0);

  const [categoryStr, setCategoryStr] = useState('');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [description, setPostBody] = useState('');
  const [showName, setShowName] = useState(false);
  const [poster_name, setPosterName] = useState('');

  const [categories, setCategories] = useState([]);

  // A boolean flag to prevent login alert from showing twice
  let loginAlert = false;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server_url}/api/categories/`);
      const data = await res.json();
      setCategories(data.filter(item => item.name != 'Trending'));
    }

    // Check the user's permissions
    async function checkUser() {
      // Check if the user is logged in
      let loggedInCookie = getCookie('pittID');

      // Check if the user is disallowed
      let authorizedCookie = getCookie('authorization');
      
      if (loggedInCookie == undefined) {
        if (!loginAlert) {
          // The user isn't logged in, redirect them to the login page
          alert("You need to login to make a new post!");
          router.push(`/login`);
          loginAlert = true;
        }
      }

      if (loggedInCookie != undefined && authorizedCookie == undefined) {
        if (!loginAlert) {
          // The user is logged in, but they're unauthorized
          alert("You're currently unable to make a new post. Please contact administration for assistance!");
          router.push(`/`);
          loginAlert = true;
        }
      }
    }

    fetchData();
    checkUser();

    // Got through the checks, so set poster_name
    setPosterName(getCookie('pittID'));
  }, []);

  // Define a function that handles the form submission
  async function handleSubmit(event) {
    // Prevent the default browser behavior
    event.preventDefault();

    // Get the numerical version of the category id
    let category_id = Number(categoryStr)

    // Prevent the user from being able to send a blank post or post after login timeout
    if (category_id == 0 || categoryStr.length < 1 || title.length < 1 || description.length < 1 || poster_name.length < 1) {
      router.push(`/new_post`);
    }

    //Set the form data so we can send it to the Django API
    const data = { category_id, title, description, keywords, poster_name, showName };

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

  // Function to handle title character count
  const handleTagChange = (e) => {
    setKeywords(e.target.value);
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
          <label htmlFor="tag">Provide keywords: (i.e., word 1,word 2,...)</label>
          <br></br>
          <AutoResize
            type="text"
            id="keywords"
            value={keywords}
            onChange={handleTagChange}
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