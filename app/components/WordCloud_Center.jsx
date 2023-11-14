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
          group: 'Career Services'
        },
        {
          word: 'ipsum',
          value: 25,
          group: 'Community'
        },
        {
          word: 'dolor',
          value: 51,
          group: 'Curriculum'
        },
        {
          word: 'amet',
          value: 40,
          group: 'Classes'
        },
        {
          word: 'consectetur',
          value: 25,
          group: 'Classrooms'
        },
        {
          word: 'adipiscing',
          value: 36,
          group: 'Community'
        },
        {
          word: 'elit',
          value: 40,
          group: 'Career Services'
        },
        {
          word: 'Duis',
          value: 18,
          group: 'Events'
        },
        {
          word: 'erat',
          value: 18,
          group: 'Career Services'
        },
        {
          word: 'auctor',
          value: 18,
          group: 'Miscellaneous'
        },
        {
          word: 'purus',
          value: 18,
          group: 'Events'
        },
        {
          word: 'ullamcorper',
          value: 18,
          group: 'Lounges'
        },
        {
          word: 'porta',
          value: 52,
          group: 'Lounges'
        },
        {
          word: 'Pellentesque',
          value: 40,
          group: 'Miscellaneous'
        },
      ]
    )

    fetchData();
  }, []);

  return (
    <div className={styles.center}>
      <WordCloudChart
        data={wordData}
        options={options}
      ></WordCloudChart>
    </div>
  )
}