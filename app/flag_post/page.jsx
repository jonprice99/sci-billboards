'use client';
import Link from "next/link"
import styles from './FlagPost.module.css'
import Home_Center from "../components/Home_Center";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

// The Django API server url to connect to the DB
const server_url = `http://127.0.0.1:8000`;

export default function flag_post({ params, searchParams }) {
  const router = useRouter();
  const [flagReasonStr, setFlagReasonStr] = useState('');
  const [post, setPost] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let alertDisplayed = false;

  useEffect(() => {
    // Check the user's permissions
    async function checkUser() {
      // Check if the user is logged in
      let loggedInCookie = getCookie('pittID');

      // Check if the user is disallowed
      let authorizedCookie = getCookie('authorization');
      
      if (loggedInCookie == undefined) {
        if (!alertDisplayed) {
          // The user isn't logged in, redirect them to the login page
          alert("You need to login to flag a post!");
          router.push(`/login`);
          alertDisplayed = true;
        }
      }

      if (loggedInCookie != undefined && authorizedCookie == undefined) {
        if (!alertDisplayed) {
          // The user is logged in, but they're unauthorized
          alert("You're currently unable to flag posts. Please contact administration for assistance!");
          router.push(`/`);
          alertDisplayed = true;
        }
      }
    }

    // Get data from the database
    async function fetchData() {
      const res = await fetch(`${server_url}/api/posts/${searchParams.category_id}/${searchParams.post_id}`);
      const data = await res.json();
      setPost(data);
    }

    checkUser();
    setIsLoggedIn(true);
    fetchData();
  }, []);

  // Define a function that handles the form submission
  async function handleSubmit(event) {
    // Prevent the default browser behavior
    event.preventDefault();

    // Prevent the user from being able to send a blank flag
    if (flagReasonStr.length < 1) {
      router.refresh();
    }

    // Calculate the appropriate weight for the flag
    let weightToAdd = 0;
    if (flagReasonStr == "inappropriateHarassment") {
      weightToAdd = 5;
    } else if (flagReasonStr == "spam") {
      weightToAdd = 4;
    } else if (flagReasonStr == "offTopic") {
      weightToAdd = 3;
    } else if (flagReasonStr == "repetitive") {
      weightToAdd = 2;
    } else if (flagReasonStr == "other") {
      weightToAdd = 1;
    }

    // Check if this post needs to be held for moderation
    let flag_weight = 0;
    let is_hidden = false;
    let is_pending_mod = false;
    if (weightToAdd + post[0].flag_weight >= 5) {
      // The flag_weight will be at least 5, we'll need to hide the post
      flag_weight = post[0].flag_weight + weightToAdd;
      is_hidden = true;
      is_pending_mod = true;
    } else {
      // We just need to update the flag weight against this post
      flag_weight = post[0].flag_weight + weightToAdd;
    }

    // Collect the rest of the data from the post for the patch
    let category_id = searchParams.category_id;
    let post_id = searchParams.post_id;
    let title = post[0].title;
    let description = post[0].description;
    let keywords = post[0].keywords;
    let progress = post[0].progress;
    let date_posted = post[0].date_posted;
    let poster_name = post[0].poster_name;
    let upvotes = post[0].upvotes;
    let comments = post[0].comments;
    let showName = post[0].showName;

    //Set the form data so we can send it to the Django API
    const data = { category_id, post_id, title, description, keywords, progress, date_posted, poster_name, upvotes, is_pending_mod, is_hidden, showName, flag_weight };

    // Submit the form data to the database
    try {
      const patchResponse = await fetch(`${server_url}/api/posts/flag_post/${searchParams.category_id}/${searchParams.post_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      console.log(patchResponse);

      if (!alertDisplayed) {
        alert("Your report has been submitted!");
      }

      // Go back to the category board page
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push(`/`);
      }
    } catch (error) {
      // There was an error when trying to post to the db
      console.error("Error when attempting to post to db:", error);
      router.refresh();
    }
  }

  // Display flag page if user is logged in
  if (!isLoggedIn) {
    return (
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href='/'>
            <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
          </Link>
          <div>
            <h2>
              Flag Post
            </h2>
            <p>Access Denied</p>
          </div>
          <div></div>
        </div>

        <Home_Center />
        <h4>This tool is only accessible to logged in users...</h4>
        <p>If you believe you should have access to this tool, contact your system administrator.</p>
      </main>
    )
  }
  else {
    return (
      <main className={styles.main}>

        <div className={styles.grid}>
          <Link href='/'>
            <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
          </Link>
          <div>
            <h2>
              Flag Post
            </h2>
            <p>Report a post to mods/admins...</p>
          </div>
          <div />
        </div>

        <Home_Center />

        <div className={styles.post_form}>
          <form method="post">
            <label htmlFor="flagReason">Reason for flagging:</label>
            <br />
            <select id="flagReason" value={flagReasonStr} onChange={(e) => setFlagReasonStr(e.target.value)}>
              <option value="">Select a reasoning</option>
              <option value="spam">Spam</option>
              <option value="inappropriateHarassment">Inappropriate/Harassment</option>
              <option value="offTopic">Off-topic/Wrong category</option>
              <option value="repetitive">Repetitive Post</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <br />
        <button className={styles.button} type="submit" onClick={handleSubmit}>Submit</button>
      </main>)
  }
}