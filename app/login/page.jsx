'use client';
import Link from "next/link"
import styles from './Login.module.css'
import Home_Center from "../components/Home_Center";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

const login = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usersJSON, setUsersJSON] = useState([]);
  const [disallowedJSON, setDisallowedJSON] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server_url}/api/mod/users/`);
      const data = await res.json();
      setUsersJSON(data);

      const disallowedRes = await fetch(`${server_url}/api/mod/disallowed_users`);
      const disallowedData = await disallowedRes.json();
      setDisallowedJSON(disallowedData);
    }

    fetchData();
  }, []);

  // Define a function that handles the form submission
  async function handleSubmit(event) {
    // Prevent the default browser behavior
    event.preventDefault();

    //Set the form data so we can send it to the Django API
    const data = { username, password };

    // Cross reference the form data to the database
    try {
      const addResponse = await fetch(`${server_url}/api/user/sign-in/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      // Possibly: Add check for empty/null array here

      // (if no error/non-null array) Set the login
      setCookie('pittID', username, {maxAge: 1200 * 6 * 24 });

      // Check if the user is a superuser in Users table to set permissions
      const object = usersJSON.find(item => item.username.toUpperCase() === username.toUpperCase());
      
      if (object) {
        // Found the user, so set the permission level
        if (object.role === 1) {
          // User is an admin
          setCookie('authorization', 1, {maxAge: 1200 * 6 * 24 });
        } else if (object.role === 2) {
          // User is a mod
          setCookie('authorization', 2, {maxAge: 1200 * 6 * 24 });
        }
      } else {
        // Go through disallowed to find username
        const disallowedObject = disallowedJSON.find(item => item.username === username);
        if (!disallowedObject) {
          // We have an authorized standard user
          setCookie('authorization', 0, {maxAge: 1200 * 6 * 24 });

          // Note: If we find a disallowed user, they don't get an authorization cookie
        }
      }

      //console.log("Success:", addResponse);
    } catch (error) {
      // There was an error when trying to connect to the db
      console.error("Login denied - invalid username/password:", error);
      router.refresh();
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  }

  // Function to handle username box
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle password box
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle 'Enter' key form submission method
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  }

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
            value={username}
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
            value={password}
            rows={1}
            size={30}
            onKeyDown={handleKeyDown}
            required
          />
        </form>
      </div>
      <br />
      <button className={styles.button} type="submit" onClick={handleSubmit}>Log in</button>
    </main>)
}

export default login