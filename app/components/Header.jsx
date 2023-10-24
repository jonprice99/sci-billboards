/**
 * This file is the header component that is added to layout.js
 */
'use client';
import styles from './Header.module.css'
import 'app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import DarkLogo from 'public/University_of_Pittsburgh_Logo_CMYK_Secondary_Reverse_2-Color.png'
import { Rubik } from 'next/font/google'  // Primary Pitt font
import { Open_Sans } from 'next/font/google'  // Secondary Pitt font
import { useState } from 'react'
import HamburgerMenu from './HamburgerMenu';

const rubik = Rubik({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href={"/"}>
                    <picture>
                        <Image
                            className={styles.logo}
                            src={DarkLogo}
                            alt="University of Pittsburgh Logo"
                            width={200}
                            height={70}
                            priority
                        />
                    </picture>
                </Link>
            </div>

            <div className={styles.header_text}>
                <h1>
                    {/* Note: This is a placeholder name. */}
                    SCI Idea Board
                </h1>
            </div>

            <div className={styles.menu_placer}>
                <HamburgerMenu />
            </div>
        </header>
    )
}
