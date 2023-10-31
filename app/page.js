'use client';
import styles from './page.module.css'
import Center from './components/Home_Center';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

export default function Home() {
  const router = useRouter();
  
  // The set of colors to be used as backgrounds for the link cards
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

  // The set of cards with their appropriate links and details
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server_url}/api/categories/`);
      const data = await res.json();
      setCards(data);
    }

    fetchData();
  }, []);
  
  /**
   * Note: To make any persistent changes to the card list, 
   * we will need to store the 
   */

  /**
   * Note for future reference: addCategory, hideCategory, 
   * and removeCategory to be removed from here and 
   * added to the mod_tools in their own dedicated pages
   */
  
  /**
   * Function to add a new category
   * @param {*} href The href of the board
   * @param {*} name The name of the board in the Card
   * @param {*} paragraph The paragraph/description of the Card
   * @param {*} isArchived Boolean of whether the board archived by default
   */
  async function addCategory({href, name, paragraph, isArchived}) {
    // Post the new category to the db
    const data = {name: name, paragraph: paragraph, href: href, isArchived: isArchived}

    try {
      const addResponse = await fetch (`${server_url}/api/categories/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      console.log("Success:", addResponse);
      
      // Take them back to the homepage to see the update
      router.push(url=`/`);  // can be changed to /mod_tools instead
    } catch (error) {
      // There was an error when trying to post to the db
      console.error("Error when attempting to post to db:", error);

      // Take them back to the homepage to see the update
      router.push(url=`/`);  // can be changed to /mod_tools instead
    }
  }

  /**
   * Function to toggle whether a category is archived
   * @param {*} href The href of the board
   */
  async function toggleArchivedCategory({href}) {
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

      // Take them back to the homepage to see the update
      router.push(url = `/`);  // can be changed to /mod_tools instead
    } catch (error) {
      console.error("Error:", error);

      // Take them back to the homepage
      router.push(url=`/`);  // can be changed to /mod_tools instead
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

      // Take them back to the homepage to see the update
      router.push(url = `/`)  // can be changed to /mod_tools instead
    } catch (error) {
      console.error("Error:", error);

      // Take them back to the homepage
      router.push(url=`/`);  // can be changed to /mod_tools instead
    }
  }

  // Display the homepage
  return (
    <main className={styles.main}>

      <Center />

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`/board/${card.href}`}
            className={styles.card}
            style={{ backgroundColor: pastelColors[(card.id-1) % pastelColors.length] }}
            target='_self'
            rel='noopener noreferrer'
          >
            <h2>{card.name}</h2>
            <p>{card.paragraph}</p>
          </Link>
        ))}

      </div>
    </main>
  )
}
