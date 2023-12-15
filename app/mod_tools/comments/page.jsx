/**
 * This is where all comments will be accessible to mods
 * and administration
 */

'use client';
import 'devextreme/dist/css/dx.light.css';
import ExtremeDataGrid, { Column, ColumnChooser, ColumnFixing, Editing, FilterRow, Popup, Paging, Scrolling, Search, SearchPanel, Selection, Toolbar, Item, Lookup, Form } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import Link from "next/link"
import styles from 'app/mod_tools/comments/CommentsTools.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

export default function CommentsTools() {
    const [allComments, setAllComments] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(`${server_url}/api/mod/comments/`);
          const data = await res.json();
          setAllComments(data);
        }

        // Check the user's permissions
        async function checkUser() {
            // Check if the user is logged in
            let loggedInCookie = getCookie('pittID');

            // Check if the user is disallowed
            let authorizedCookie = getCookie('authorization');

            if (loggedInCookie == undefined) {
                if (!alertDisplayed) {
                    // The user isn't logged in, redirect them to the login page
                    alert("Access Denied: You need to login and be a moderator or administrator to access this page!");
                    router.push(`/login`);
                    alertDisplayed = true;
                }
            }

            if (loggedInCookie != undefined && (authorizedCookie == undefined || authorizedCookie < 1)) {
                if (!alertDisplayed) {
                    // The user is logged in, but they're unauthorized
                    alert("Access Denied: Only moderators or administrators can access this page!");
                    router.push(`/`);
                    alertDisplayed = true;
                }
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
        { dataField: 'is_pending_mod', caption: 'isPendingMod', allowEditing: true, allowAdding: false, sortOrder: 'desc' },
        { dataField: 'is_hidden', caption: 'isHidden', allowEditing: true, allowAdding: false},
        { dataField: 'category_id', caption: 'category_id', allowEditing: false, allowAdding: false },
        { dataField: 'post_id', caption: 'post_id', allowEditing: false, allowAdding: false },
        { dataField: 'comment_id', caption: 'comment_id', allowEditing: false, allowAdding: false },
        { dataField: 'showName', caption: 'showName', allowEditing: false, allowAdding: false },
        { dataField: 'user_name', caption: 'poster_name', allowEditing: false, allowAdding: false },
        { dataField: 'body', caption: 'body', allowEditing: false, allowAdding: false }
    ];

    // Columns for the admin table
    const adminColumns = [
        { dataField: 'is_pending_mod', caption: 'isPendingMod', allowEditing: true, allowAdding: true, sortOrder: 'desc' },
        { dataField: 'is_hidden', caption: 'isHidden', allowEditing: true, allowAdding: true},
        { dataField: 'category_id', caption: 'category_id', allowEditing: true, allowAdding: true },
        { dataField: 'post_id', caption: 'post_id', allowEditing: true, allowAdding: true },
        { dataField: 'comment_id', caption: 'comment_id', allowEditing: true, allowAdding: true },
        { dataField: 'showName', caption: 'showName', allowEditing: true, allowAdding: true },
        { dataField: 'user_name', caption: 'poster_name', allowEditing: true, allowAdding: true },
        { dataField: 'body', caption: 'body', allowEditing: true, allowAdding: true }
    ];

    /**
     * Function to add a new comment
     */
    async function addComment( event ) {
        let changes = event.data

        // Format the data for the database
        let category_id = changes.category_id;
        let post_id = changes.post_id;
        let comment_id = changes.comment_id;
        let user_name = changes.user_name;
        let body = changes.body;
        let comment_date = changes.comment_date;
        let is_hidden = changes.is_hidden;
        let is_pending_mod = changes.is_pending_mod;
        const data = { category_id, post_id, comment_id, user_name, body, comment_date, is_hidden, is_pending_mod }

        try {
            const addResponse = await fetch(`${server_url}/api/comments/create`, {
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
     * Function for mods to update a comment
     */
    async function updateComment( event ) {
        let changes = event.data;

        // Format the data for the database
        let category_id = changes.category_id;
        let post_id = changes.post_id;
        let comment_id = changes.comment_id;
        let user_name = changes.user_name;
        let body = changes.body;
        let comment_date = changes.comment_date;
        let is_hidden = changes.is_hidden;
        let is_pending_mod = changes.is_pending_mod;
        const data = { category_id, post_id, comment_id, user_id, user_name, body, comment_date, is_hidden, is_pending_mod }
        
        // Send the data into the database
        try {
            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/mod/comments/update/${data.category_id}/${data.post_id}/${data.comment_id}`, {
                method: "PATCH",
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
     * Function to remove a post
     */
    async function removeComment( event ) {
        let changes = event.data

        // Format the data for the database
        let category_id = changes.category_id;
        let post_id = changes.post_id;
        let comment_id = changes.comment_id;
        let user_name = changes.user_name;
        let body = changes.body;
        let comment_date = changes.comment_date;
        let is_hidden = changes.is_hidden;
        let is_pending_mod = changes.is_pending_mod;
        const data = { category_id, post_id, comment_id, user_name, body, comment_date, is_hidden, is_pending_mod }

        // Get the current data for the board
        try {
            // Send the DELETE request to remove the category from the db
            const deleteResponse = await fetch(`${server_url}/api/comments/delete/${data.category_id}/${data.post_id}/${data.comment_id}`, {
                method: "DELETE"
            });

            console.log("Success:", deleteResponse);
            //router.refresh();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Display the Mod Comment Tools page
    if (!isAdmin) {
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Comments (Moderator)
                        </h2>
                        <p></p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '100%', height: '00px' }}>
                    <ExtremeDataGrid
                        dataSource={allComments}
                        columns={columns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        onRowUpdated={updateComment}
                    >
                        <ColumnChooser enabled={true} />
                        <ColumnFixing enabled={true} />
                        <FilterRow visible={true} />
                        <Scrolling mode='infinite' />
                        <SearchPanel visible={true} />
                        <Selection mode="single" />
                        <Editing
                            mode="row"
                            allowUpdating={true}
                            allowDeleting={false}
                            allowAdding={false}
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
        // Return the Admin Comment Tools
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Comments (Admin)
                        </h2>
                        <p></p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '100%' }}>
                    <ExtremeDataGrid
                        dataSource={allComments}
                        columns={adminColumns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        onRowUpdated={updateComment}
                        onRowInserted={addComment}
                        onRowRemoved={removeComment}
                    >
                        <ColumnChooser enabled={true} />
                        <ColumnFixing enabled={true} />
                        <FilterRow visible={true} />
                        <Scrolling mode='infinite' />
                        <SearchPanel visible={true} />
                        <Selection mode="single" />
                        <Editing
                            mode="row"
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