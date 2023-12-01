/**
 * This is the file where the word cloud for the homepage HTML
 * is located. (Currently just a Pitt Logo placeholder...)
 */

import 'app/globals.css'
import styles from './WordCloud_Center_Dark.module.css'
import { WordCloudChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'
import options from './wordcloud_dark_options.js'
import { useEffect, useState } from 'react'

const server_url = `http://127.0.0.1:8000`;

export default function Home_Center_Dark() {
  const [wordData, setWordData] = useState([]);
  let keywordJSON;
  
  // Get the data from the database
  useEffect(() => {
    async function fetchData() {
      //const res = await fetch(`${server_url}/api/keywords/`);
      //const data = await res.json();
      //keywordsJSON = data;
    }

    setWordData(
      [
        {
          word: 'lectures',
          value: 52,
          group: 'curriculum'
        },
        {
          word: 'Computer Science',
          value: 25,
          group: 'career_services'
        },
        {
          word: 'databases',
          value: 51,
          group: 'student_services'
        },
        {
          word: 'IT',
          value: 40,
          group: 'classrooms'
        },
        {
          word: 'Information Science',
          value: 25,
          group: 'community'
        },
        {
          word: 'networking',
          value: 36,
          group: 'events'
        },
        {
          word: 'wi-fi',
          value: 40,
          group: 'miscellaneous'
        },
        {
          word: 'water filters',
          value: 18,
          group: 'lounges'
        },
        {
          word: 'feedback',
          value: 18,
          group: 'community'
        },
        {
          word: 'Cathedral of Learning',
          value: 18,
          group: 'miscellaneous'
        },
        {
          word: 'Roc',
          value: 18,
          group: 'miscellaneous'
        },
        {
          word: 'Sennott Square',
          value: 18,
          group: 'classrooms'
        },
        {
          word: 'IS Building',
          value: 52,
          group: 'classrooms'
        },
        {
          word: 'web applications',
          value: 40,
          group: 'curriculum'
        },
        {
          word: 'encryption',
          value: 18,
          group: 'classes'
        },
        {
          word: 'capstones',
          value: 52,
          group: 'curriculum'
        },
        {
          word: 'grad school',
          value: 40,
          group: 'student_services'
        },
        {
          word: 'machine learning',
          value: 65,
          group: 'curriculum'
        },
        {
          word: 'algorithms',
          value: 76,
          group: 'curriculum'
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