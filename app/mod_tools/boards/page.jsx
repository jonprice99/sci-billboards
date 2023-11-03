/**
 * This page has the mod and admin tools to manage
 * boards (i.e., adding new ones, hiding them from
 * public view, and deleting them)
 */

'use client';
import Link from "next/link"
import styles from 'app/mod_tools/boards/BoardTools.module.css'
import AutoResize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

export default function BoardTools() {
    const charLimit = 160;
    const [nameCount, setNameCount] = useState(0);
    const [hrefCount, setHrefCount] = useState(0);
    const [paragraphCount, setParagraphCount] = useState(0);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [href, setHref] = useState('');
    const [visHref, setVisHref] = useState('');
    const [delHref, setDelHref] = useState('');
    const [paragraph, setParagraph] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(`${server_url}/api/mod/categories/`);
          const data = await res.json();
          setCategories(data);
        }
    
        fetchData();
      }, []);

    // Define a function that handles the new category submission
    function handleSubmitNewCategory(event) {
        // Prevent the default browser behavior
        event.preventDefault();

        // Call the function that connects to the db
        console.log({ href, name, paragraph });
        //addCategory({href, name, paragraph});
    }

    // Define a function that handles the category visibilty submission
    function handleUpdateVisibility(event) {
        // Prevent the default browser behavior
        event.preventDefault();

        // Call the function that connects to the db
        //toggleArchivedCategory(visHref);
        console.log({visHref});
    }

    // Define a function that handles the category visibilty submission
    function handleDelCategory(event) {
        // Prevent the default browser behavior
        event.preventDefault();

        // Call the function that connects to the db
        //removeCategory(delHref);
        console.log({delHref});
    }

    // Function to handle title character count
    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameCount(e.target.value.length);
    };

    // Function to handle title character count
    const handleHrefChange = (e) => {
        setHref(e.target.value);
        setHrefCount(e.target.value.length);
    };

    // Function to handle body character count
    const handleParagraphChange = (e) => {
        setParagraph(e.target.value);
        setParagraphCount(e.target.value.length);
    };

    /**
     * Function to add a new category
     * @param {*} href The href of the board
     * @param {*} name The name of the board in the Card
     * @param {*} paragraph The paragraph/description of the Card
     * @param {*} isArchived Boolean of whether the board archived by default
     */
    async function addCategory({ href, name, paragraph }) {
        // Post the new category to the db
        const data = { name, paragraph, href }

        console.log(data)

        try {
            const addResponse = await fetch(`${server_url}/api/categories/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log("Success:", addResponse);
            router.refresh();
        } catch (error) {
            // There was an error when trying to post to the db
            console.error("Error when attempting to post to db:", error);
        }
    }

    /**
     * Function to toggle whether a category is archived
     * @param {*} href The href of the board
     */
    async function toggleArchivedCategory({ href }) {
        // Get the current data for the board
        try {
            const response = await fetch(`${server_url}/api/categories/${href}`);
            const data = await response.json();

            // Toggle the isArchived value
            data.isArchived = !data.isArchived;

            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/categories/update/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log("Success:", putResponse);
            router.refresh();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    /**
     * Function to remove a card from the grid based on the title
     * @param {*} href The href of the category you wish to remove
     */
    async function removeCategory(href) {
        // Get the current data for the board
        try {
            const response = await fetch(`${server_url}/api/categories/${href}`);
            const data = await response.json();

            // Send the DELETE request to remove the category from the db
            const deleteResponse = await fetch(`${server_url}/api/categories/delete/${data.id}`, {
                method: "DELETE"
            });

            console.log("Success:", deleteResponse);
            router.refresh();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Display the Board Tools page
    return (
        <main className={styles.main}>
            <div className={styles.grid}>
                <Link href='/'>
                    <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Home</h3>
                </Link>
                <div>
                    <h2>
                        Board Tools
                    </h2>
                    <p></p>
                </div>
                <div></div>
            </div>

            <h3>Board List (id | name | href | isArchived):</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>{category.id} | {category.name} | {category.href} | {(category.isArchived).toString()}</li>
                ))}
            </ul>
            <br />
            <br />
            <h3>Create a new category:</h3>
            <div className={styles.post_form}>
                {/* Note: Need to update this so it will post to database */}
                <form onSubmit={handleSubmitNewCategory}>
                    <label htmlFor="name">name:</label>
                    <p>{`Characters left: ${charLimit - nameCount}`}</p>
                    <AutoResize
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        maxLength={charLimit}
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="href">href:</label>
                    <p>{`Characters left: ${charLimit - hrefCount}`}</p>
                    <AutoResize
                        id="href"
                        value={href}
                        onChange={handleHrefChange}
                        maxLength={charLimit}
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="paragraph">paragraph:</label>
                    <p>{`Characters left: ${charLimit - paragraphCount}`}</p>
                    <AutoResize
                        id="paragraph"
                        value={paragraph}
                        onChange={handleParagraphChange}
                        maxLength={charLimit}
                    />
                    <br />
                    <button className={styles.button} type="submit">Add New Category</button>
                </form>
            </div>
            <br />
            <br />
            <h3>Show/Archive Category:</h3>
            <div className={styles.post_form}>
                <form>
                    <label htmlFor="category">category:</label>
                    <br />
                    <select id="category" value={visHref} onChange={(e) => setVisHref(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.name} value={cat.href}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button className={styles.button} type="submit" onClick={handleUpdateVisibility}>Update Category Visibilty</button>
                </form>
            </div>
            <br />
            <br />
            <h3>Delete Category (Admin):</h3>
            <div className={styles.post_form}>
                <form>
                    <label htmlFor="category">category:</label>
                    <br />
                    <select id="category" value={delHref} onChange={(e) => setDelHref(e.target.value)}>
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.name} value={cat.href}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button className={styles.button} type="submit" onClick={handleDelCategory}>Delete Category</button>
                </form>
            </div>
        </main>
    )
}