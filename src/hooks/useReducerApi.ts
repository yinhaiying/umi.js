import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

// 创建一个reducer
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT': {
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    };
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    };
    case 'FETCH_FAILURE': {
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    };
    default:
      throw new Error();
  }
}
const useDataApi = (initSearch, initData) => {
  const [search, setSearch] = useState(initSearch);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initData
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(
          `http://hn.algolia.com/api/v1/search?query=${search}`,
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    }
    fetchData();
  }, [search]);
  const doFetch = (query) => {
    setSearch(query)
  }
  return { ...state, doFetch };
}

export default useDataApi;

