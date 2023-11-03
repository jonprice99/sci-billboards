/**
 * This file contains the hamburger menu component of the app
 * which allows the user to access accessibility tools and
 * moderation/admin tools when logged in
 */

import { useState, useEffect, useRef } from "react";
import 'app/globals.css';
import styles from "./HamburgerMenu.module.css";
import FontSizeButton from './FontSizeButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'

export default function HamburgerMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);


    /* close menu whenever user clicks anywhere on screen outside hamburger menu elements*/
    useEffect(() => {
        const closeMenuOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("click", closeMenuOutsideClick);
        }
        else {
            document.removeEventListener("click", closeMenuOutsideClick);
        }


        return () => {
            document.removeEventListener("click", closeMenuOutsideClick);
        };
    }, [isMenuOpen]);


    /* when menu is clicked */
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    /* close menu when navigating to another page */
    const closeMenu = () => {
        setIsMenuOpen(false);
    };


    return (
        <div>
            {/* when menu is clicked hide open button */}
            {isMenuOpen ? (
                <div className={styles.menu_icon} onClick={handleMenuClick}>
                    <FontAwesomeIcon icon={faX} size="xl" style={{ color: "#003594", }} />
                </div>
            ) : (
                <div className={styles.menu_icon} onClick={handleMenuClick}>
                    <FontAwesomeIcon icon={faBars} size="xl" style={{ color: "#ffffff", }} />
                </div>
            )}
            {isMenuOpen && (
                <div className={styles.menu} ref={menuRef}>
                    <div className={styles.close_button} onClick={handleMenuClick}>
                        <FontAwesomeIcon icon={faX} size="lg" style={{ color: "#003594", }} />
                    </div>
                    <div>
                        <FontSizeButton closeMenu={closeMenu} />
                    </div>
                </div>
            )}

        </div>
    )
}
