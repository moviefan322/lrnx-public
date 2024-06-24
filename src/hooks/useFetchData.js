// hooks/useFetchData.js
import { useState, useEffect } from 'react';

const useFetchData = (url, requestConfig) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, requestConfig);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (url && requestConfig) {
      fetchData();
    }
  }, [url, requestConfig]);

  return { data, error, isLoading };
};

export default useFetchData;
