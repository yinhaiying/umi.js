
import React, { useState, useReducer } from 'react'
import useReducerApi from '../hooks/useReducerApi'

export default () => {
  const [query, setQuery] = useState('redux');         // 查询参数

  const { isLoading, isError, data, doFetch } = useReducerApi(query, []);
  return (
    <>
      <h2>useReducer请求数据</h2>
      <form onSubmit={e => {
        e.preventDefault();
        doFetch(query);
      }}>
        <input type="text" value={query} onChange={event => setQuery(event.target.value)} />
        <button type="submit">搜索</button>
      </form>
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
  )
}
