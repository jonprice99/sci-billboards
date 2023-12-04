/**
 * This is the file where the word cloud for the homepage HTML
 * is located. (Currently just a Pitt Logo placeholder...)
 */

'use client';
import 'app/globals.css'
import styles from './WordCloud_Center_Dark.module.css'
import { WordCloudChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'
import options from './wordcloud_dark_options.js'
import { useEffect, useState } from 'react'

const server_url = `http://127.0.0.1:8000`;

export default function Home_Center_Dark() {
  const [wordData, setWordData] = useState([]);

  async function fetchData() {
    const res = await fetch(`${server_url}/api/posts/`);
    const data = await res.json();
    //console.log(data)

    const catRes = await fetch(`${server_url}/api/categories/`)
    const catData = await catRes.json();
    //console.log(catData)

    // Break down the keywords and id them by category
    let keywordMap = data.reduce((acc, obj) => {
      let k = obj.keywords.split(",");
      k.forEach((keyword) => {
        acc.push({ category_id: obj.category_id, keyword: keyword });
      });
      return acc;
    }, []);
    //console.log(keywordMap)

    // Count each keyword based on how often it appears in a category
    let wordCount = Object.values(
      keywordMap.reduce((acc, { category_id, keyword }) => {
        let index = acc.findIndex((obj) => obj.category_id === category_id && obj.word === keyword);
        if (index === -1) {
          acc.push({ category_id, word: keyword, count: 1 });
        } else {
          acc[index].count++;
        }
        return acc;
      }, [])
    );
    //console.log(wordCount);

    // Attach the category names for each corresponding category id
    let wordCountWithNames = wordCount.map((item) => {
      let category = catData.find((c) => c.id === item.category_id);
      return {
        ...item,
        category_name: category ? category.name : catData[item.category_id]
      };
    });
    //console.log(wordCountWithNames)

    // Remove the category ids and format the array for the wordcloud
    let result = wordCountWithNames.map(function (obj) {
      return {
        word: obj.word,
        value: obj.count,
        group: obj.category_name,
      };
    });
    //console.log(result);

    setWordData(result);
  }
  
  // Get the data from the database
  useEffect(() => {
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