'use client';
import Link from "next/link"
import styles from './NewPost.module.css'
import Image from 'next/image'
import AutoResize from 'react-textarea-autosize';
import Home_Center from "../components/Home_Center";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';

const server_url = `http://127.0.0.1:8000`;

const new_post = () => {
  // Constant to set the character limit of the post title
  const title_limit = 160;
  const descript_limit = 2048;

  const [titleCount, setTitleCount] = useState(0);
  const [descriptCount, setPostBodyCount] = useState(0);

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setPostBody] = useState('');

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server_url}/api/categories/`);
      const data = await res.json();
      setCategories(data);
    }

    fetchData();
  }, []);

  console.log(categories)

  // Define a function that handles the form submission
  function handleSubmit(event) {
    // Prevent the default browser behavior
    event.preventDefault();

    // Do something with the form data, such as sending it to an API or displaying it on the screen
    console.log({ category, title, content });
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
          <button className={styles.button} type="submit" onClick={handleSubmit}>Submit</button>
      </div>

      <Home_Center />

      <div className={styles.post_form}>
        {/* Note: Need to update this so it will post to database */}
        <form method="post">
        <label htmlFor="category">Category:</label>
          <br />
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.href}>
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
          />
          <br></br>
          <br></br>
          <label htmlFor="post_body">Give additional details:</label>
          <p>{`Characters left: ${descript_limit - descriptCount}`}</p>
          <AutoResize
            id="post_body"
            value={content}
            onChange={handlePostBodyChange}
            maxLength="2048"
            rows="5"
          />
        </form>
      </div>
    </main>)
}

export default new_post