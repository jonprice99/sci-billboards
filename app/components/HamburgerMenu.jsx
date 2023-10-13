/**
 * This file contains the hamburger menu component of the app
 * which allows the user to access accessibility tools and
 * moderation/admin tools when logged in
 */

import { useState } from "react";
import 'app/globals.css';
import styles from "./HamburgerMenu.module.css";
import FontSizeButton from './FontSizeButton'

export default function HamburgerMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div>
            <div className={`${styles.menu} ${isMenuOpen ? 'open' : ''}`}>
                {/* Aiming to place the FontSizeButton module here */}
            </div>
            <div className={styles.menu_icon} onClick={handleMenuClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}