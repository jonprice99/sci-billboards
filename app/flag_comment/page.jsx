'use client';
import Link from "next/link"
import styles from './FlagComment.module.css'
import Home_Center from "../components/Home_Center";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

// The Django API server url to connect to the DB
const server_url = `http://127.0.0.1:8000`;

export default function flag_comment({ params, searchParams }) {
  const router = useRouter();
  const [flagReasonStr, setFlagReasonStr] = useState('');
  const [comment, setComment] = useState([]);
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
        }
      }

      if (loggedInCookie != undefined && authorizedCookie == undefined) {
        if (!alertDisplayed) {
          // The user is logged in, but they're unauthorized
          alert("You're currently unable to flag posts. Please contact administration for assistance!");
          router.push(`/`);
        }
      }
    }

    // Get data from the database
    async function fetchData() {
      // Get all the comments
      const res = await fetch(`${server_url}/api/comments/${searchParams.category_id}/${searchParams.post_id}`);
      const data = await res.json();

      // Get the specific comment we're dealing with
      let commentToFlag = data.filter(comment => comment.category_id == searchParams.category_id && comment.post_id == searchParams.post_id && comment.comment_id == searchParams.comment_id);
      setComment(commentToFlag);
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

    // Check if this comment needs to be held for moderation
    let flag_weight = 0;
    let is_hidden = false;
    let is_pending_mod = false;
    if (weightToAdd + comment[0].flag_weight >= 5) {
      // The flag_weight will be at least 5, we'll need to hide the post
      flag_weight = comment[0].flag_weight + weightToAdd;
      is_hidden = true;
      is_pending_mod = true;
    } else {
      // We just need to update the flag weight against this post
      flag_weight = comment[0].flag_weight + weightToAdd;
    }

    // Collect the rest of the data from the comment for the patch
    let category_id = searchParams.category_id;
    let post_id = searchParams.post_id;
    let comment_id = searchParams.comment_id;
    let user_name = comment[0].user_name;
    let body = comment[0].body;
    let comment_date = comment[0].comment_date;
    let showName = comment[0].showName;

    //Set the form data so we can send it to the Django API
    const data = { category_id, post_id, comment_id, user_name, body, comment_date, is_pending_mod, is_hidden, showName, flag_weight };

    // Submit the form data to the database
    try {
      const patchResponse = await fetch(`${server_url}/api/comments/flag_comment/${searchParams.category_id}/${searchParams.post_id}/${searchParams.comment_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      console.log(patchResponse)

      if (!alertDisplayed) {
        alert("Your report has been submitted!");
      }

      // Go back to the category board page in history
      if (window.history.length > 2) {
        router.back();
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
              Flag Comment
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
              Flag Comment
            </h2>
            <p>Report a comment to mods/admins...</p>
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
              <option value="repetitive">Repetitive comment</option>
              <option value="other">Other</option>
            </select>
          </form>
        </div>
        <br />
        <button className={styles.button} type="submit" onClick={handleSubmit}>Submit</button>
      </main>)
  }
}