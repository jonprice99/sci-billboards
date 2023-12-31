/**
 * This is where all posts will be accessible to mods
 * and administration
 */

'use client';
import 'devextreme/dist/css/dx.light.css';
import ExtremeDataGrid, { Column, ColumnChooser, ColumnFixing, Editing, FilterRow, Popup, Paging, Scrolling, Search, SearchPanel, Selection, Toolbar, Item, Lookup, Form } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import Link from "next/link"
import styles from 'app/mod_tools/posts/PostsTools.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

export default function PostsTools() {
    const [allPosts, setAllPosts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    let alertDisplayed = false;

    useEffect(() => {
        async function fetchData() {
          console.log('Fetching...')
          const res = await fetch(`${server_url}/api/mod/posts/`);
          const data = await res.json();
          setAllPosts(data);
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
        { dataField: 'flag_weight', caption: 'flag_weight', allowEditing: true, allowAdding: false, sortOrder: 'desc' },
        { dataField: 'is_pending_mod', caption: 'isPendingMod', allowEditing: true, allowAdding: false, sortOrder: 'desc' },
        { dataField: 'is_hidden', caption: 'isHidden', allowEditing: true, allowAdding: false},
        { dataField: 'date_posted', caption: 'date_posted', allowEditing: false, allowAdding: false },
        { dataField: 'category_id', caption: 'category_id', allowEditing: false, allowAdding: false },
        { dataField: 'post_id', caption: 'post_id', allowEditing: false, allowAdding: false },
        { dataField: 'poster_name', caption: 'poster_name', allowEditing: false, allowAdding: false },
        { dataField: 'showName', caption: 'showName', allowEditing: false, allowAdding: false },
        { dataField: 'progress', caption: 'progress', allowEditing: true, allowAdding: false },
        { dataField: 'keywords', caption: 'keywords', allowEditing: true, allowAdding: false },
        { dataField: 'title', caption: 'title', allowEditing: false, allowAdding: false },
        { dataField: 'description', caption: 'description', allowEditing: false, allowAdding: false },
        { dataField: 'upvotes', caption: 'upvotes', allowEditing: false, allowAdding: false },
        { dataField: 'comments', caption: 'comments', allowEditing: false, allowAdding: false },
        { dataField: 'keywords', caption: 'keywords', allowEditing: false, allowAdding: false },
    ];

    // Columns for the admin table
    const adminColumns = [
        { dataField: 'flag_weight', caption: 'flag_weight', allowEditing: true, allowAdding: true, sortOrder: 'desc' },
        { dataField: 'is_pending_mod', caption: 'isPendingMod', allowEditing: true, allowAdding: true, sortOrder: 'desc' },
        { dataField: 'is_hidden', caption: 'isHidden', allowEditing: true, allowAdding: true},
        { dataField: 'date_posted', caption: 'date_posted', allowEditing: true, allowAdding: true },
        { dataField: 'category_id', caption: 'category_id', allowEditing: true, allowAdding: true },
        { dataField: 'post_id', caption: 'post_id', allowEditing: true, allowAdding: true },
        { dataField: 'poster_name', caption: 'poster_name', allowEditing: true, allowAdding: true },
        { dataField: 'showName', caption: 'showName', allowEditing: true, allowAdding: true },
        { dataField: 'progress', caption: 'progress', allowEditing: true, allowAdding: true },
        { dataField: 'keywords', caption: 'keywords', allowEditing: true, allowAdding: true },
        { dataField: 'title', caption: 'title', allowEditing: true, allowAdding: true },
        { dataField: 'description', caption: 'description', allowEditing: true, allowAdding: true },
        { dataField: 'upvotes', caption: 'upvotes', allowEditing: true, allowAdding: true },
        { dataField: 'comments', caption: 'comments', allowEditing: false, allowAdding: false },
    ];

    /**
     * Function to add a new post
     */
    async function addPost( event ) {
        let changes = event.data

        // Admin data
        let category_id = changes.category_id;
        let post_id = changes.post_id;
        let title = changes.title;
        let description = changes.description;
        let keywords = changes.keywords;
        let progress = changes.progress;
        let date_posted = changes.date_posted;
        let poster_name = changes.poster_name;
        let upvotes = changes.upvotes;
        let comments = changes.comments;
        let is_hidden = changes.is_hidden;
        let is_pending_mod = changes.is_pending_mod;
        let showName = changes.showName;
        let flag_weight = changes.flag_weight;
        const data = { category_id, post_id, title, description, keywords, progress, date_posted, poster_name, upvotes, comments, is_hidden, is_pending_mod, comment_count, showName, flag_weight };

        try {
            const addResponse = await fetch(`${server_url}/api/posts/create`, {
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
     * Function to update a post
     */
    async function updatePost( event ) {
        let changes = event.data;

        // Format the data for the database
        let category_id = changes.category_id;
        let post_id = changes.post_id;
        let title = changes.title;
        let description = changes.description;
        let keywords = changes.keywords;
        let progress = changes.progress;
        let date_posted = changes.date_posted;
        let poster_name = changes.poster_name;
        let upvotes = changes.upvotes;
        let comments = changes.comments;
        let is_hidden = changes.is_hidden;
        let is_pending_mod = changes.is_pending_mod;
        let showName = changes.showName;
        let flag_weight = changes.flag_weight;
        const data = { category_id, post_id, title, description, keywords, progress, date_posted, poster_name, upvotes, comments, is_hidden, is_pending_mod, comment_count, showName, flag_weight };
        
        // Send the data into the database
        try {
            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/mod/posts/update/${data.category_id}/${data.post_id}`, {
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
    async function removePost( event ) {
        let changes = event.data

        // Format the data for the database
        let category_id = changes.category_id;
        let post_id = changes.post_id;
        let title = changes.title;
        let description = changes.description;
        let keywords = changes.keywords;
        let progress = changes.progress;
        let date_posted = changes.date_posted;
        let poster_name = changes.poster_name;
        let upvotes = changes.upvotes;
        let comments = changes.comments;
        let is_hidden = changes.is_hidden;
        let is_pending_mod = changes.is_pending_mod;
        let showName = changes.showName;
        let flag_weight = changes.flag_weight;
        const data = { category_id, post_id, title, description, keywords, progress, date_posted, poster_name, upvotes, comments, is_hidden, is_pending_mod, comment_count, showName, flag_weight }

        // Get the current data for the board
        try {
            // Send the DELETE request to remove the category from the db
            const deleteResponse = await fetch(`${server_url}/api/posts/delete/${data.category_id}/${data.post_id}`, {
                method: "DELETE"
            });

            console.log("Success:", deleteResponse);
            //router.refresh();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Display the Moderator Post Tools page
    if (!isAdmin) {
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Posts (Moderator)
                        </h2>
                        <p></p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '80%' }}>
                    <ExtremeDataGrid
                        dataSource={allPosts}
                        columns={columns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        onRowUpdated={updatePost}
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
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            Posts (Admin)
                        </h2>
                        <p></p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '80%' }}>
                    <ExtremeDataGrid
                        dataSource={allPosts}
                        columns={adminColumns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        onRowInserted={addPost}
                        onRowUpdated={updatePost}
                        onRowRemoved={removePost}
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