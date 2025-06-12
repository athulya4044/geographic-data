//Sidebar component for the Earthquake Dashboard
import { BarChart } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <aside className="bg-white w-16 flex flex-col items-center py-4 shadow">
          <div className="flex justify-center items-center w-10 h-10 bg-teal-700 rounded-full">
            <span className="text-white font-bold">ED</span>
          </div>
          <nav className="flex flex-col items-center space-y-6 mt-6">
            <BarChart className="w-6 h-6 text-teal-600" />
          </nav>
        </aside>
      </div>
    </div>
  );
}
