/**
 * This is the file where the word cloud for the homepage HTML
 * is located. (Currently just a Pitt Logo placeholder...)
 */

import 'app/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import styles from './WordCloud_Center.module.css'
import DarkSeal from 'public/Shield_White.png'
import LightSeal from 'public/Shield_Black.png'
import { WordCloudChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'
import options from './wordcloud_options.js'
import { useEffect, useState } from 'react'

const server_url = `http://127.0.0.1:8000`;

export default function Home_Center() {
  const [wordData, setWordData] = useState([]);

  // Get the data from the database
  useEffect(() => {
    async function fetchData() {
      //const res = await fetch(`${server_url}/api/categories/`);
      //const data = await res.json();
      //setWordData(data);
    }

    setWordData(
      [
        {
          word: 'Lorem',
          value: 52,
          group: ''
        },
        {
          word: 'ipsum',
          value: 25,
          group: ''
        },
        {
          word: 'dolor',
          value: 51,
          group: ''
        },
        {
          word: 'amet',
          value: 40,
          group: ''
        },
        {
          word: 'consectetur',
          value: 25,
          group: ''
        },
        {
          word: 'adipiscing',
          value: 36,
          group: ''
        },
        {
          word: 'elit',
          value: 40,
          group: ''
        },
        {
          word: 'Duis',
          value: 18,
          group: ''
        },
        {
          word: 'erat',
          value: 18,
          group: ''
        },
        {
          word: 'auctor',
          value: 18,
          group: ''
        },
        {
          word: 'purus',
          value: 18,
          group: ''
        },
        {
          word: 'ullamcorper',
          value: 18,
          group: ''
        },
        {
          word: 'porta',
          value: 52,
          group: ''
        },
        {
          word: 'Pellentesque',
          value: 40,
          group: ''
        },
        {
          word: 'corn',
          value: 18,
          group: ''
        },
        {
          word: 'beans',
          value: 52,
          group: ''
        },
        {
          word: 'potatoes',
          value: 40,
          group: ''
        },
        {
          word: 'tomatoes',
          value: 65,
          group: ''
        },
        {
          word: 'yams',
          value: 76,
          group: ''
        },
      ]
    )

    fetchData();
  }, []);

  return (
    <div className={styles.center}>
      <div className={styles.chart}>
        <WordCloudChart
          data={wordData}
          options={options}
        ></WordCloudChart>
      </div>
    </div>
  )
}