/**
 * This page has the mod and admin tools to manage
 * boards (i.e., adding new ones, hiding them from
 * public view, and deleting them)
 */

'use client';
import 'devextreme/dist/css/dx.light.css';
import ExtremeDataGrid, { Column, ColumnChooser, ColumnFixing, Editing, FilterRow, Popup, Paging, Search, SearchPanel, Selection, Toolbar, Item, Lookup, Form } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
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

    // Columns for the table
    const columns = [
        { dataField: 'isArchived', caption: 'isArchived'},
        { dataField: 'id', caption: 'id', allowEditing: false, allowAdding: false },
        { dataField: 'name', caption: 'name' },
        { dataField: 'href', caption: 'href' },
        { dataField: 'paragraph', caption: 'paragraph'},
    ];

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
     */
    async function addCategory( event ) {
        let changes = event.data

        // Post the new category to the db
        let name = changes.name;
        let paragraph = changes.paragraph;
        let href = changes.href;
        let isArchived = changes.isArchived;
        const data = { name, paragraph, href, isArchived }

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
     * Function to update a category
     */
    async function updateCategory( event ) {
        let changes = event.data;

        // Format the data for the database
        let id = changes.id;
        let name = changes.name;
        let paragraph = changes.paragraph;
        let href = changes.href;
        let isArchived = changes.isArchived;
        const data = { name, paragraph, href, isArchived }
        
        // Get the current data for the board
        try {
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
     * Function to remove a category
     */
    async function removeCategory( event ) {
        let changes = event.data

        // Format the data for the database
        let id = changes.id;
        let name = changes.name;
        let paragraph = changes.paragraph;
        let href = changes.href;
        let isArchived = changes.isArchived;
        const data = { id, name, paragraph, href, isArchived }

        // Get the current data for the board
        try {
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

            <br />
            <div style={{ width: '100%' }}>
                <ExtremeDataGrid
                    dataSource={categories}
                    columns={columns}
                    columnAutoWidth={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    keyExpr={"id"}
                    onRowInserted={addCategory}
                    onRowUpdated={updateCategory}
                    onRowRemoved={removeCategory}
                >
                    <ColumnChooser enabled={true} />
                    <ColumnFixing enabled={true} />
                    <FilterRow visible={true} />
                    <SearchPanel visible={true} />
                    <Selection mode="single" />
                    <Editing
                        mode="form"
                        allowUpdating={true}
                        allowDeleting={true}
                        allowAdding={true}
                    />
                    <Toolbar>
                        <Item name="addRowButton" showText="in-menu" />
                        <Item name="searchPanel" />
                    </Toolbar>
                </ExtremeDataGrid>
            </div>
            <br />
            <br />
        </main>
    )
}