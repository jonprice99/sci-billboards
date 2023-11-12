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
import styles from 'app/mod_tools/auto_mod/AutoModTools.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faFlag, faAngleLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const server_url = `http://127.0.0.1:8000`;

// Flag for mod/admin power separation (to be replaced by login power check)
const isAdmin = false;

export default function AutoModTools() {
    const [phrases, setPhrases] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
          const res = await fetch(`${server_url}/api/mod/auto_mod_terms/`);
          const data = await res.json();
          setPhrases(data);
        }
    
        fetchData();
      }, []);

    // Columns for the mod table
    const columns = [
        //{ dataField: 'id', caption: 'id', allowEditing: false, allowAdding: false },
        { dataField: 'phrase', caption: 'phrase' },
    ];

    // Columns for the admin table
    const adminColumns = [
        { dataField: 'id', caption: 'id', allowEditing: true, allowAdding: true },
        { dataField: 'name', caption: 'name' },
    ];

    /**
     * Function to add a new phrase
     */
    async function addPhrase( event ) {
        let changes = event.data;
        let data = {};

        // Post the new category to the db
        if (!isAdmin) {
            // Mod data
            let phrase = changes.phrase;
            data = { phrase }
        } else {
            // Admin data
            let id = changes.id;
            let phrase = changes.phrase;
            data = { id, phrase }
        }

        console.log(data)

        try {
            const addResponse = await fetch(`${server_url}/api/mod/auto_mod_terms/add/`, {
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
     * Function to update a phrase
     */
    async function updatePhrase( event ) {
        let changes = event.data;

        // Format the data for the database
        let id = changes.id;
        let phrase = changes.phrase;
        const data = { id, phrase }
        
        // Get the current data for the board
        try {
            // Send the PUT request with the updated data
            const putResponse = await fetch(`${server_url}/api/mod/auto_mod_terms/update/${data.id}/`, {
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
     * Function to remove a phrase
     */
    async function removePhrase( event ) {
        let changes = event.data

        // Format the data for the database
        let id = changes.id;
        let phrase = changes.phrase;
        const data = { id, phrase }

        // Get the current data for the board
        try {
            // Send the DELETE request to remove the category from the db
            const deleteResponse = await fetch(`${server_url}/api/auto_mod_terms/delete/${data.id}/`, {
                method: "DELETE"
            });

            console.log("Success:", deleteResponse);
            //router.refresh();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Display the AutoMod Tools page
    if (!isAdmin) {
        return (
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href='/mod_tools'>
                        <h3><FontAwesomeIcon icon={faAngleLeft} size="lg" /> Back to Mod Tools</h3>
                    </Link>
                    <div>
                        <h2>
                            AutoMod (Moderator)
                        </h2>
                        <p>Add new terms or modify current terms blocked by AutoMod</p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '100%' }}>
                    <ExtremeDataGrid
                        dataSource={phrases}
                        columns={columns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        keyExpr={"id"}
                        onRowInserted={addPhrase}
                        onRowUpdated={updatePhrase}
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
                            AutoMod (Admin)
                        </h2>
                        <p></p>
                    </div>
                    <div></div>
                </div>
    
                <br />
                <div style={{ width: '100%' }}>
                    <ExtremeDataGrid
                        dataSource={phrases}
                        columns={adminColumns}
                        columnAutoWidth={true}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        keyExpr={"id"}
                        onRowInserted={addPhrase}
                        onRowUpdated={updatePhrase}
                        onRowRemoved={removePhrase}
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