/**
 * This is where all posts will be accessible to mods
 * and administration
 */

'use client';
import JSZip from 'jszip';
import 'devextreme/dist/css/dx.light.css';
import ExtremeDataGrid, { Column, ColumnChooser, ColumnFixing, Editing, FilterRow, Popup, Paging, Scrolling, Search, SearchPanel, Selection, Toolbar, Item, Lookup, Form } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import Link from "next/link"
import styles from 'app/mod_tools/dashboard/DashboardTools.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie, hasCookie } from 'cookies-next';

const server_url = `http://127.0.0.1:8000`;

export default function PostsTools() {
    const [categories, setCategories] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [allUpvotes, setAllUpvotes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Get the Posts table
            const resPosts = await fetch(`${server_url}/api/mod/posts/`);
            const dataPosts = await resPosts.json();
            setAllPosts(dataPosts);

            // Get the Categories table
            const resCat = await fetch(`${server_url}/api/mod/categories/`);
            const dataCat = await resCat.json();
            setCategories(dataCat);

            // Get the Comments table
            const resComm = await fetch(`${server_url}/api/mod/comments/`);
            const dataComm = await resComm.json();
            setAllComments(dataComm);

            // Get the User_Upvotes table
            const upvotesResponse = await fetch(`${server_url}/api/user_upvotes/`);
            const upvotesData = await upvotesResponse.json();
            setAllUpvotes(upvotesData);
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
        }

        fetchData();
        checkUser();
    }, []);

    // Columns for the categories overview table
    const categoriesColumns = [
        { dataField: 'isArchived', caption: 'isArchived', width: 80 },
        { dataField: 'id', caption: 'id', allowEditing: false, allowAdding: false },
        { dataField: 'name', caption: 'name' },
        { dataField: 'href', caption: 'href' },
        { dataField: 'paragraph', caption: 'paragraph'},
        { dataField: 'post_count', caption: 'post_count'},
    ];

    // Columns for the posts overview table
    const postsColumns = [
        { dataField: 'is_pending_mod', caption: 'isPendingMod', allowEditing: false, allowAdding: false, sortOrder: 'desc' },
        { dataField: 'is_hidden', caption: 'isHidden', allowEditing: true, allowAdding: false},
        { dataField: 'category_id', caption: 'category_id', allowEditing: false, allowAdding: false },
        { dataField: 'post_id', caption: 'post_id', allowEditing: false, allowAdding: false },
        { dataField: 'poster_name', caption: 'poster_name', allowEditing: false, allowAdding: false },
        { dataField: 'showName', caption: 'showName', allowEditing: false, allowAdding: false },
        { dataField: 'progress', caption: 'progress', allowEditing: false, allowAdding: false },
        { dataField: 'title', caption: 'title', allowEditing: false, allowAdding: false },
        { dataField: 'upvotes', caption: 'upvotes', allowEditing: false, allowAdding: false },
        { dataField: 'comment_count', caption: 'comments', allowEditing: false, allowAdding: false },
        { dataField: 'keywords', caption: 'keywords', allowEditing: false, allowAdding: false },
    ];

    // Columns for the comments overview table
    const commentsColumns = [
        { dataField: 'category_id', caption: 'category_id', allowEditing: false, allowAdding: false },
        { dataField: 'post_id', caption: 'post_id', allowEditing: false, allowAdding: false },
        { dataField: 'comment_id', caption: 'comment_id', allowEditing: false, allowAdding: false },
        { dataField: 'user_name', caption: 'user_name', allowEditing: false, allowAdding: false },
        { dataField: 'body', caption: 'body', allowEditing: false, allowAdding: false },
        { dataField: 'comment_date', caption: 'comment_date', allowEditing: false, allowAdding: false },
        { dataField: 'is_pending_mod', caption: 'isPendingMod', allowEditing: true, allowAdding: false, sortOrder: 'desc' },
        { dataField: 'is_hidden', caption: 'isHidden', allowEditing: true, allowAdding: false},
    ];

    // Function to download the categories and posts in JSON form
    function downloadJSONs() {
        // Format the arrays in JSON format
        const categoriesJSON = JSON.stringify(categories, null, 2);
        const postsJSON = JSON.stringify(allPosts, null, 2);
        const commentsJSON = JSON.stringify(allComments, null, 2);
        const upvotesJSON = JSON.stringify(allUpvotes, null, 2);
      
        // Create the zip file
        const zip = new JSZip();
        zip.file('categories.json', categoriesJSON);
        zip.file('posts.json', postsJSON);
        zip.file('comments.json', commentsJSON);
        zip.file('user_upvotes.json', upvotesJSON)

        // Set the filename
        const filename = `SCI_Idea_Board_Data.zip`; 
      
        zip.generateAsync({ type: 'blob' }).then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
    }

    // Display the Dashboard page
    return (
        <main className={styles.main}>
            <div className={styles.grid}>
                <Link href='/mod_tools'>
                    <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                </Link>
                <div>
                    <h2>
                        Dashboard
                    </h2>
                    <p>Get an overview of the Idea Board & download data for analysis</p>
                </div>
                <div>
                    <button className={styles.button} onClick={downloadJSONs}>Download</button>
                </div>
            </div>

            <br />
            <h3>Categories:</h3>
            <div style={{ width: '80%' }}>
                <ExtremeDataGrid
                    dataSource={categories}
                    columns={categoriesColumns}
                    columnAutoWidth={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    keyExpr={"id"}
                >
                    <ColumnChooser enabled={true} />
                    <ColumnFixing enabled={true} />
                    <FilterRow visible={true} />
                    <Scrolling mode='infinite' />
                    <SearchPanel visible={true} />
                    <Selection mode="single" />
                    <Editing
                        mode="form"
                        allowUpdating={false}
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
            <h3>Posts:</h3>
            <div style={{ width: '80%' }}>
                {/* Posts Dashboard */}
                <ExtremeDataGrid
                    dataSource={allPosts}
                    columns={postsColumns}
                    columnAutoWidth={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                >
                    <ColumnChooser enabled={true} />
                    <ColumnFixing enabled={true} />
                    <FilterRow visible={true} />
                    <Scrolling mode='infinite' />
                    <SearchPanel visible={true} />
                    <Selection mode="single" />
                    <Editing
                        mode="row"
                        allowUpdating={false}
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
            <h3>Comments:</h3>
            <div style={{ width: '80%' }}>
                <ExtremeDataGrid
                    dataSource={allComments}
                    columns={commentsColumns}
                    columnAutoWidth={true}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                >
                    <ColumnChooser enabled={true} />
                    <ColumnFixing enabled={true} />
                    <FilterRow visible={true} />
                    <Scrolling mode='infinite' />
                    <SearchPanel visible={true} />
                    <Selection mode="single" />
                    <Editing
                        mode="row"
                        allowUpdating={false}
                        allowDeleting={false}
                        allowAdding={false}
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