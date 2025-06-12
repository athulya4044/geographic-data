// This hook fetches earthquake data from the USGS API.
// import { useState, useEffect } from "react";
// import Papa from "papaparse";

// export function useEarthquakeData() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       console.log("Fetching earthquake data...");
//       try {
//         const response = await fetch(
//           "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv"
//         );
//         const text = await response.text();

//         const parsed = Papa.parse(text, {
//           header: true,
//           skipEmptyLines: true,
//           dynamicTyping: true,
//           worker: true,
//           complete: (results) => {
//             const slicedData = results.data.slice(0, 25); // Limit to 25 records
//             setData(slicedData);
//             setLoading(false);
//           },
//         });
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   return { data, loading, error };
// }
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
        setTotalEntries(result.totalEntries); // ✅ Fix here
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
