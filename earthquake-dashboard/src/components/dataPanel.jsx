// This component displays the earthquake data in a table format.
// It highlights the selected earthquake and scrolls to it when selected.

import { useEffect, useRef } from "react";

export default function DataPanel({ data, selectedQuake, setSelectedQuake }) {
  const rowRefs = useRef([]);

  useEffect(() => {
    if (selectedQuake) {
      const index = data.findIndex((row) => row.time === selectedQuake.time);
      if (index !== -1 && rowRefs.current[index]) {
        rowRefs.current[index].scrollIntoView({
          // Scroll to the selected row
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedQuake, data]);

  if (!data || data.length === 0) {
    return <div className="p-4">No data to display.</div>;
  }

  const keyColumns = ["time", "mag", "depth", "place"];

  return (
    <div>
      <div className="bg-white rounded-2xl shadow overflow-auto max-h-[29.75rem]">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-slate-100 text-gray-600 uppercase text-xs sticky top-0 z-10 shadow">
            <tr>
              {keyColumns.map((header) => (
                <th key={header} className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => {
              const isSelected = // Check if the current row is the selected earthquake
                selectedQuake && selectedQuake.time === row.time;
              return (
                <tr
                  key={index}
                  ref={(el) => (rowRefs.current[index] = el)}
                  onMouseOver={() => setSelectedQuake(row)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-green-100" : "hover:bg-slate-50"
                  }`}
                >
                  {keyColumns.map((header) => (
                    <td key={header} className="px-4 py-3 whitespace-nowrap">
                      {header === "time"
                        ? new Date(row[header]).toLocaleString()
                        : row[header]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
