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
                            width={230}
                            height={50}
                            priority
                        />
                    </picture>
                </Link>
            </div>

            <div className={styles.header_text}>
                {/* <a href={"/"} className={styles.vertical_line}>
                </a> */}
                <Link href={"/"}>
                    <div className={styles.titleInfo}>
                        <h4>
                            Idea Board
                        </h4>
                        <p>School of Computing and Information</p>
                    </div>
                </Link>
            </div>

            <div className={styles.menu_placer}>
                <HamburgerMenu />
            </div>
        </header >
    )
}
