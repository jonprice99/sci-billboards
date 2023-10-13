/**
 * This file contains the component that will serve as accessibility
 * buttons to increase or decrease the size of text across the site
 */

import { useState } from "react";
import 'app/globals.css'
import styles from './FontSizeButton.module.css'

export default function FontSizeButton() {
    const [fontSize, setFontSize] = useState(100);

    const increaseSize = () => {
        setFontSize(prevFontSize => prevFontSize + 25);
    }

    const decreaseSize = () => {
        setFontSize(prevFontSize => prevFontSize - 25);
    }

    return (
        <div>
            <button onClick={increaseSize}>Increase Font Size</button>
            <button onClick={decreaseSize}>Decrease Font Size</button>
            <style jsx global>{`
            * {
              font-size: ${fontSize}%;
            }
          `}</style>
        </div>
    )
}