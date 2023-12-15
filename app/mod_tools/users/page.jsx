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
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

export default function UsersTools() {
    const [allUsers, setAllUsers] = useState([]);
    const [disallowedUsers, setDisallowedUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    let alertDisplayed = false;

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(`${server_url}/api/mod/users/`);
          const data = await res.json();
          setAllUsers(data);

          const disallowedRes = await fetch(`${server_url}/api/mod/disallowed_users/`);
          const disallowedData = await disallowedRes.json();
          setDisallowedUsers(disallowedData);
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

    // Columns for the Users table
    const adminColumns = [
        { dataField: 'username', caption: 'username', allowEditing: true, allowAdding: true },
        { dataField: 'role', caption: 'role', allowEditing: true, allowAdding: true }
    ];

    // Columns for the Users table
    const adminDisallowedColumns = [
        { dataField: 'username', caption: 'username', allowEditing: true, allowAdding: true },
    ];

    /**
     * Function to add a new user
     */
    async function addUser( event ) {
        let changes = event.data

        // Admin data
        let user_id = changes.user_id;
        let username = changes.user_name;
        let role = changes.role;
        const data = { user_id, username, role }

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
     * Function to add a new disallowed user
     */
    async function addDisallowedUser( event ) {
        let changes = event.data

        let username = changes.username;
        const data = { username }

        try {
            const addResponse = await fetch(`${server_url}/api/disallowed_users/add`, {
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
     * Function for admins to update a user
     */
    async function updateUser( event ) {
        let changes = event.data;

        // Admin data
        let user_id = changes.user_id;
        let username = changes.user_name;
        let role = changes.role;
        const data = { user_id, username, role };
        
        // Send the data into the database
        try {
            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/mod/users/update/${data.user_id}`, {
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
     * Function for admins to update a disallowed user
     */
    async function updateDisallowedUser( event ) {
        let changes = event.data;

        let username = changes.username;
        const data = { username };
        
        // Send the data into the database
        try {
            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/mod/disallowed_users/update/${data.username}`, {
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
     * Function to remove a user
     */
    async function removeUser( event ) {
        let changes = event.data

        // Admin data
        let username = changes.user_name;
        let role = changes.role;
        const data = { user_id, username, role };

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

    /**
     * Function to remove a disallowed user
     */
    async function removeDisallowedUser( event ) {
        let changes = event.data

        // Admin data
        let username = changes.username;
        const data = { username };

        // Get the current data for the board
        try {
            // Send the DELETE request to remove the category from the db
            const deleteResponse = await fetch(`${server_url}/api/disallowed_users/delete/${data.user_id}`, {
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
                        <p>Manage superusers & disallowed users</p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <h3>Users:</h3>
                <div style={{ width: '70%' }}>
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
                <h3>Disallowed Users:</h3>
                <div style={{ width: '70%' }}>
                    <ExtremeDataGrid
                        dataSource={disallowedUsers}
                        columns={adminDisallowedColumns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        onRowUpdated={updateDisallowedUser}
                        onRowInserted={addDisallowedUser}
                        onRowRemoved={removeDisallowedUser}
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
    
            </main>
        )
    }
}