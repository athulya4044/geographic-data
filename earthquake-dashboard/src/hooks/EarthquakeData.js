// This hook fetches earthquake data from the backend API
// and manages pagination, loading state, and error handling.
import { useEffect, useState } from "react";

export function useEarthquakeData(page = 1, entries = 25) {
  const [data, setData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEarthquakeData() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/getdata?page=${page}&entries=${entries}`
        );
        const result = await response.json();

        setData(result.data);
        setTotalEntries(result.totalEntries); 
        console.log("API Response:", result);

      } catch (err) {
        console.error("Error fetching earthquake data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEarthquakeData();
  }, [page, entries]);

  return { data, totalEntries, loading, error };
}
