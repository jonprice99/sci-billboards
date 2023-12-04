/**
 * This file contains the buttons for the hamburger menu
 */

import { useState } from "react";
import 'app/globals.css'
import styles from './FontSizeButton.module.css'
import Link from 'next/link'
import { hasCookie, deleteCookie } from "cookies-next";

export default function FontSizeButton({ closeMenu }) {
    const isLoggedIn = hasCookie("pittID");

    const handleLogout = () => {
        // clearing the "pittID" cookie
        deleteCookie("pittID");

        if (hasCookie('authorization')) {
            deleteCookie('authorization');
        }

        window.location.href = "/";
    };


    return (
        <div className={styles.button_layout}>
            <div>
                {isLoggedIn ? (
                    // If user is logged in, display "Logout"
                    <button className={styles.font_size_button} onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    // If user is not logged in, display "Login"
                    <Link href={"/login"}>
                        <button className={styles.font_size_button} onClick={closeMenu}>
                            Login
                        </button>
                    </Link>
                )}
            </div>
            <div>
                <Link href={"/mod_tools"}>
                    <button className={styles.font_size_button} onClick={closeMenu}>Mod Tools</button>
                </Link>
            </div>

            <style jsx global>{`
            * {
              font-size: ${fontSize}%;
            }
          `}</style>
        </div>
    )
}
