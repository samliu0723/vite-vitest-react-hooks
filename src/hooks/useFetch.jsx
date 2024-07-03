import { useState, useEffect } from "react";

/**
 * Custom hook to fetch data from a given URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {'json' | 'text' | 'blob' | 'formData'} responseType - The expected response type.
 * @returns {Object} - The returned object containing the data, loading state, and error message.
 * @returns {any} data - The fetched data.
 * @returns {boolean} loading - The loading state.
 * @returns {string|null} error - The error message, if any.
 */
const useFetch = (url, responseType = "json") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data;
        switch (responseType) {
          case "json":
            data = await response.json();
            break;
          case "text":
            data = await response.text();
            break;
          case "blob":
            data = await response.blob();
            break;
          case "formData":
            data = await response.formData();
            break;
          default:
            throw new Error("Unsupported response type");
        }

        setData(data);
        setError(null);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, responseType]);

  return { data, loading, error };
};

export default useFetch;
