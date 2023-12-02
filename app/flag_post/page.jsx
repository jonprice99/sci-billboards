'use client';
import Link from "next/link"
import styles from './FlagPost.module.css'
import Image from 'next/image'
import AutoResize from 'react-textarea-autosize';
import Home_Center from "../components/Home_Center";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

export default function flag_post({ params, searchParams }) {
  const router = useRouter();
  const [flagReasonStr, setFlagReasonStr] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in & allowed to flag posts
    async function checkUser() {

    }

    checkUser();
    setIsLoggedIn(true);
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

    //Set the form data so we can send it to the Django API
    const data = {  };

    // Submit the form data to the database
    try {
      const addResponse = await fetch(`${server_url}/api/posts/flag_post/${searchParams.category_id}/${searchParams.post_id}`, {
        method: "PATCH",
      });

      alert("Your report has been submitted!");

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