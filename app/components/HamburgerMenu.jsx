/**
 * This file contains the hamburger menu component of the app
 * which allows the user to access accessibility tools and
 * moderation/admin tools when logged in
 */

import { useState } from "react";
import 'app/globals.css';
import styles from "./HamburgerMenu.module.css";
import FontSizeButton from './FontSizeButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/'

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
                <FontAwesomeIcon icon={faBars} size="xl" style={{color: "#ffffff",}} />
            </div>
        </div>
    )
}