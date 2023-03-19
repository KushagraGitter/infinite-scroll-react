import React, { useState, useRef, useCallback } from 'react';
import useBookSearch from './useBookSearch';
import './style.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNUmber] = useState(1);
  const { loading, error, searchData, hasMoreData } = useBookSearch(
    search,
    pageNumber
  );

  function handleInput(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  let observer = useRef();
  let intersectionObs = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('Found the node');
          setPageNUmber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreData]
  );

  return (
    <div>
      <input value={search} onChange={(e) => handleInput(e)} />
      <ul>
        {searchData.length > 0 &&
          searchData.map((data, idx) => {
            if (idx === searchData.length - 1) {
              return (
                <li ref={intersectionObs} key={data}>
                  {data}
                </li>
              );
            }
            return <li key={data}>{data}</li>;
          })}
      </ul>
      <div> {loading && <li>...Loading</li>}</div>
    </div>
  );
}
