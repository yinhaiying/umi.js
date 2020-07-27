
import React, { useState, useEffect } from 'react';
import axios from 'axios'
export default () => {
  const [data, setData] = useState({ hits: [] });      // 请求接口获取数据保存
  const [query, setQuery] = useState('redux');         // 查询参数
  const [search, setSearch] = useState('redux');       // 处理频繁触发加载的问题
  const [isLoading, setIsLoading] = useState(false);   // 加载中
  const [isError, setIsError] = useState(false);       // 处理错误异常
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(
          `http://hn.algolia.com/api/v1/search?query=${search}`,
        );
        setData(result.data);
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false);
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
      {/* error处理 */}
      {isError && <div>Something went wrong ...</div>}
      {/* 加载中动画处理 */}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
    </>
  );
}


