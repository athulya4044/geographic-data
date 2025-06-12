// This component displays a scatter plot of earthquake data using Recharts.
import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartPanel({ data, selectedQuake, setSelectedQuake }) {
  const [axisPair, setAxisPair] = useState("magVsDepth");

  // Determine xAxis and yAxis based on the selected axis pair
  const axisConfig = {
    magVsDepth: { xAxis: "mag", yAxis: "depth" },
    depthVsMag: { xAxis: "depth", yAxis: "mag" },
  };

  const { xAxis, yAxis } = axisConfig[axisPair];

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="flex justify-end gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
            Axes
          </label>
          <select
            value={axisPair}
            onChange={(e) => setAxisPair(e.target.value)}
            className="appearance-none rounded-xl px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 shadow-inner"
          >
            <option value="magVsDepth">Magnitude vs Depth</option>
            <option value="depthVsMag">Depth vs Magnitude</option>
          </select>
        </div>
      </div>

      <div className="bg-[#f9fafb] rounded-xl p-4">
        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              type="number"
              dataKey={xAxis}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{
                value: xAxis,
                position: "insideBottom",
                offset: -8,
                fill: "#6b7280",
              }}
            />
            <YAxis
              type="number"
              dataKey={yAxis}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{
                value: yAxis,
                angle: -90,
                position: "insideLeft",
                offset: -5,
                fill: "#6b7280",
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "0.875rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              itemStyle={{ color: "#374151" }}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
            />
            <Scatter
              data={data}
              shape={({ cx, cy, payload }) => {
                const isSelected =
                  selectedQuake && payload.time === selectedQuake.time; // Check if this is selected
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 10 : 6}
                    fill={isSelected ? "#f97316" : "#22c55e"}
                    stroke="#fff"
                    strokeWidth="1.5"
                    opacity={0.85}
                    className="transition-all duration-300 ease-in-out cursor-pointer"
                    onMouseOver={() => setSelectedQuake(payload)}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
