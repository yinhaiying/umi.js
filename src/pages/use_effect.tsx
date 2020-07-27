
import React, { useState, useEffect } from 'react';
import axios from 'axios'
export default () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('redux');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://hn.algolia.com/api/v1/search?query=${search}`,
      );
      setData(result.data);
    };

    fetchData();
  }, [search])   // 依赖了query这个变量的,因此需要传入query
  return (
    <>
      <h2>use Effect请求数据</h2>
      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      <ul>
        {data.hits.map(item => (
          // @ts-ignore
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}


