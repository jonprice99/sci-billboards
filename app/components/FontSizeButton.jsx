/**
 * This file contains the component that will serve as accessibility
 * buttons to increase or decrease the size of text across the site
 */

import { useState } from "react";
import 'app/globals.css'
import styles from './FontSizeButton.module.css'
import Link from 'next/link'

export default function FontSizeButton() {
    const [fontSize, setFontSize] = useState(100);

    const increaseSize = () => {
        setFontSize(prevFontSize => prevFontSize + 25);
    }

    const decreaseSize = () => {
        setFontSize(prevFontSize => prevFontSize - 25);
    }



    return (
        <div className={styles.button_layout}>
            <div>
                <Link href={"/"}>
                    <button className={styles.font_size_button}>Login</button>
                </Link>
            </div>
            <div>
                <button className={styles.font_size_button} onClick={increaseSize}>Increase Font Size</button>
            </div>
            <div>
                <button className={styles.font_size_button} onClick={decreaseSize}>Decrease Font Size</button>
            </div>
            <div>
                <Link href={"/mod_tools"}>
                    <button className={styles.font_size_button}>Mod Tools</button>
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
