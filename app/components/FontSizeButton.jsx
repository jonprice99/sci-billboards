/**
 * This file contains the component that will serve as accessibility
 * buttons to increase or decrease the size of text across the site
 */

import { useState } from "react";
import 'app/globals.css'
import styles from './FontSizeButton.module.css'
import Link from 'next/link'
import { hasCookie, deleteCookie } from "cookies-next";

export default function FontSizeButton({ closeMenu }) {
    const [fontSize, setFontSize] = useState(100);

    const increaseSize = () => {
        setFontSize(prevFontSize => prevFontSize + 25);
    }

    const decreaseSize = () => {
        setFontSize(prevFontSize => prevFontSize - 25);
    }

    const isLoggedIn = hasCookie("pittID");

    const handleLogout = () => {
        // clearing the "pittID" cookie
        deleteCookie("pittID");

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
