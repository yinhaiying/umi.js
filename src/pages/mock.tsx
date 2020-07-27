import React, { useEffect, useState } from 'react';
import styles from './index.less';
import axios from 'axios';
export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/users');
      console.log('result:', result.data.data)
      setData(result.data.data);
      console.log('data:', data)
    }
    fetchData();
  }, []);
  type user = {
    title: string;
    content: string;
  }
  return (
    <>
      <h1 className={styles.title}>Page index</h1>
      {
        (
          <ul>
            {data.map((item: user) => (
              <li key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        )
      }
      <button>按钮</button>
    </>
  );
}
