/**
 * This is where all users will be accessible
 * to administration
 */

'use client';
import 'devextreme/dist/css/dx.light.css';
import Center from 'app/components/Home_Center';
import ExtremeDataGrid, { Column, ColumnChooser, ColumnFixing, Editing, FilterRow, Popup, Paging, Scrolling, Search, SearchPanel, Selection, Toolbar, Item, Lookup, Form } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import Link from "next/link"
import styles from 'app/mod_tools/comments/CommentsTools.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

// Flag for mod/admin power separation (to be replaced by login power check)
const isAdmin = false;

export default function UsersTools() {
    const [allUsers, setAllUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(`${server_url}/api/mod/users/`);
          const data = await res.json();
          setAllUsers(data);
        }
    
        fetchData();
      }, []);

    // Columns for the admin table
    const adminColumns = [
        { dataField: 'user_id', caption: 'user_id', allowEditing: true, allowAdding: true },
        { dataField: 'username', caption: 'poster_name', allowEditing: true, allowAdding: true },
        { dataField: 'role', caption: 'role', allowEditing: true, allowAdding: true },
        { dataField: 'isDisallowed', caption: 'isDisallowed', allowEditing: true, allowAdding: true }
    ];

    /**
     * Function to add a new comment
     */
    async function addUser( event ) {
        let changes = event.data

        // Admin data
        let user_id = changes.user_id;
        let username = changes.user_name;
        let role = changes.role;
        let isDisallowed = changes.isDisallowed;
        const data = { user_id, username, role, isDisallowed }

        try {
            const addResponse = await fetch(`${server_url}/api/users/add`, {
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
    async function updateUser( event ) {
        let changes = event.data;

        // Admin data
        let user_id = changes.user_id;
        let username = changes.user_name;
        let role = changes.role;
        let isDisallowed = changes.isDisallowed;
        const data = { user_id, username, role, isDisallowed };
        
        // Send the data into the database
        try {
            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/mod/users/update/${data.user_id}`, {
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
     * Function to remove a post
     */
    async function removeUser( event ) {
        let changes = event.data

        // Admin data
        let user_id = changes.user_id;
        let username = changes.user_name;
        let role = changes.role;
        let isDisallowed = changes.isDisallowed;
        const data = { user_id, username, role, isDisallowed };

        // Get the current data for the board
        try {
            // Send the DELETE request to remove the category from the db
            const deleteResponse = await fetch(`${server_url}/api/users/delete/${data.user_id}`, {
                method: "DELETE"
            });

            console.log("Success:", deleteResponse);
            //router.refresh();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Display the Mod Users Tools page
    if (!isAdmin) {
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Users (Moderator)
                        </h2>
                        <p>Access Denied</p>
                    </div>
                    <div></div>
                </div>

                <Center />
                <h4>This tool is only accessible to Admins...</h4>
                <p>If you believe you should have access to this tool, contact your system administrator.</p>
            </main>
        )
    } else {
        // Return the Admin Users Tools
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Users (Admin)
                        </h2>
                        <p></p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '100%' }}>
                    <ExtremeDataGrid
                        dataSource={allUsers}
                        columns={adminColumns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        onRowUpdated={updateUser}
                        onRowInserted={addUser}
                        onRowRemoved={removeUser}
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