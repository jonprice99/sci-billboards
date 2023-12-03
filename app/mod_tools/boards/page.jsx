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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

export default function BoardTools() {
    const [categories, setCategories] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(`${server_url}/api/mod/categories/`);
          const data = await res.json();
          setCategories(data);
        }

        // Check the user's permissions
        async function checkUser() {
            // Check if the user is logged in
            let loggedInCookie = getCookie('pittID');

            // Check if the user is disallowed
            let authorizedCookie = getCookie('authorization');

            if (loggedInCookie == undefined) {
                // The user isn't logged in, redirect them to the login page
                alert("Access Denied: You need to login and be a moderator or administrator to access this page!");
                router.push(`/login`);
            }

            if (loggedInCookie != undefined && authorizedCookie < 1) {
                // The user is logged in, but they're unauthorized
                alert("Access Denied: Only moderators or administrators can access this page!");
                router.push(`/`);
            }

            if (authorizedCookie == 1) {
                // The user is an admin
                setIsAdmin(true);
            }
        }
    
        fetchData();
        checkUser();
    }, []);

    // Columns for the mod table
    const columns = [
        { dataField: 'isArchived', caption: 'isArchived'},
        { dataField: 'id', caption: 'id', allowEditing: false, allowAdding: false },
        { dataField: 'name', caption: 'name' },
        { dataField: 'href', caption: 'href' },
        { dataField: 'paragraph', caption: 'paragraph'},
    ];

    // Columns for the admin table
    const adminColumns = [
        { dataField: 'isArchived', caption: 'isArchived'},
        { dataField: 'id', caption: 'id', allowEditing: true, allowAdding: true },
        { dataField: 'name', caption: 'name' },
        { dataField: 'href', caption: 'href' },
        { dataField: 'paragraph', caption: 'paragraph'},
    ];

    /**
     * Function to add a new category
     */
    async function addCategory( event ) {
        let changes = event.data;
        let data = {};

        // Post the new category to the db
        if (!isAdmin) {
            // Mod data
            let name = changes.name;
            let paragraph = changes.paragraph;
            let href = changes.href;
            let isArchived = changes.isArchived;
            data = { name, paragraph, href, isArchived }
        } else {
            // Admin data
            let id = changes.id;
            let name = changes.name;
            let paragraph = changes.paragraph;
            let href = changes.href;
            let isArchived = changes.isArchived;
            data = { id, name, paragraph, href, isArchived }
        }

        try {
            const addResponse = await fetch(`${server_url}/api/categories/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log("Success:", addResponse);
            //router.refresh();
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
        const data = { id, name, paragraph, href, isArchived }
        
        // Get the current data for the board
        try {
            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/categories/update/${data.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log("Success:", putResponse);
            //router.refresh();
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
            const deleteResponse = await fetch(`${server_url}/api/categories/delete/${data.id}/`, {
                method: "DELETE"
            });

            console.log("Success:", deleteResponse);
            //router.refresh();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Display the Board Tools page
    if (!isAdmin) {
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Boards (Moderator)
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
                    >
                        <ColumnChooser enabled={true} />
                        <ColumnFixing enabled={true} />
                        <FilterRow visible={true} />
                        <SearchPanel visible={true} />
                        <Selection mode="single" />
                        <Editing
                            mode="form"
                            allowUpdating={true}
                            allowDeleting={false}
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
    } else {
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Boards (Admin)
                        </h2>
                        <p></p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '100%' }}>
                    <ExtremeDataGrid
                        dataSource={categories}
                        columns={adminColumns}
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
}