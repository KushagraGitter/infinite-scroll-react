import React, { useState, useEffect } from 'react';

export default function useBookSearch(search, currentPage) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(false);
      const data = await fetch(
        `https://openlibrary.org/search.json?q=${search}&page=${currentPage}`
      );
      const sData = await data.json();
      setSearchData((prevData) => [
        ...new Set([...prevData, ...sData.docs.map((d) => d.title)]),
      ]);
      setHasMoreData(sData.docs.length > 0);
      setLoading(false);
      setError(false);
      console.log(sData.docs);
    }
    search.length > 0 && getData();
  }, [search, currentPage]);

  return { loading, error, searchData, hasMoreData };
}
