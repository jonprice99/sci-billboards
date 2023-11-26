'use client';
import Link from "next/link"
import styles from './Login.module.css'
import AutoResize from 'react-textarea-autosize';
import Home_Center from "../components/Home_Center";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

const login = () => {
  const router = useRouter();

  const [usrStr, setUsrStr] = useState('');
  const [pasStr, setPasStr] = useState('');

  useEffect(() => {
    //async function fetchData() {
    //  const res = await fetch(`${server_url}/api/categories/`);
    //  const data = await res.json();
    //  setCategories(data.filter(item => item.name != 'Trending'));
    //}

    //fetchData();
  }, []);

  // Define a function that handles the form submission
  async function handleSubmit(event) {
    // Prevent the default browser behavior
    event.preventDefault();

    //Set the form data so we can send it to the Django API
    const data = { usrStr, pasStr }

    // Cross reference the form data to the database
    try {
      //const addResponse = await fetch(`${server_url}/api/posts/create/`, {
      //  method: "POST",
      //  headers: {
      //    "Content-Type": "application/json"
      //  },
      //  body: JSON.stringify(data)
      //});

      //console.log("Success:", addResponse);
      router.push(`/`);
    } catch (error) {
      // There was an error when trying to connect to the db
      console.error("Error when attempting to connect to db:", error);
      router.refresh();
    }
  }

  // Function to handle username box
  const handleUsernameChange = (e) => {
    setUsrStr(e.target.value);
  };

  // Function to handle password box
  const handlePassChange = (e) => {
    setPasStr(e.target.value);
  };

  return (
    <main className={styles.main}>

      <div className={styles.grid}>
        <Link href='/'>
          <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
        </Link>
        <div>
          <h2>
            Login
          </h2>
          <p>Log in to the Idea Board with your Pitt ID...</p>
        </div>
        <div />
      </div>

      <Home_Center />

      <div className={styles.post_form}>
        <form method="post">
          <label htmlFor="username">Username: (ex. abc123)</label>
          <br />
          <input
            type="text"
            id="username"
            onChange={handleUsernameChange}
            value={usrStr}
            rows={1}
            size={30}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            id="password"
            type="password"
            onChange={handlePassChange}
            value={pasStr}
            rows={1}
            size={30}
            required
          />
        </form>
      </div>
      <br />
      <button className={styles.button} type="submit" onClick={handleSubmit}>Log in</button>
    </main>)
}

export default login