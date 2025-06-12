import Sidebar from "./components/sidebar";
import ChartPanel from "./components/chartPanel";
import DataPanel from "./components/dataPanel";
import { useEarthquakeData } from "./hooks/EarthquakeData";
import LoadingIndicator from "./components/loading";
import Pagination from "./components/Pagination";
import { useState } from "react";

export default function App() {
  // Pagination state
  const [page, setPage] = useState(1);
  const entriesPerPage = 25;

  // Fetch paginated data
  const { data, totalEntries, loading, error } = useEarthquakeData(
    page,
    entriesPerPage
  );

  const [selectedQuake, setSelectedQuake] = useState(null);

  if (loading) return <LoadingIndicator />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-teal-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="bg-teal-700 text-white p-4 shadow-sm">
          <h1 className="text-xl font-bold">Earthquake Data</h1>
        </header>
        <main className="flex flex-1 overflow-hidden">
          <section className="flex-1 overflow-auto p-8">
            <ChartPanel
              data={data}
              selectedQuake={selectedQuake}
              setSelectedQuake={setSelectedQuake}
            />
          </section>
          <section className="flex-1 overflow-auto p-8">
            <DataPanel
              data={data}
              selectedQuake={selectedQuake}
              setSelectedQuake={setSelectedQuake}
            />
            <div className="mt-6">
              <Pagination
                currentPage={page}
                totalEntries={totalEntries}
                entriesPerPage={25}
                onPageChange={(newPage) => {
                  setPage(newPage);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
