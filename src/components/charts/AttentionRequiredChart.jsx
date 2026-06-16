import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#f59e0b", // Open
  "#3b82f6", // Assigned
  "#ef4444", // Rejected
];

export default function AttentionRequiredChart({ onFilter }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://https://defect-dashboard-api.onrender.com/api/charts/attention-required",
      )
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          nameKey="name"
          onClick={(data) => {
            if (data?.name) {
              onFilter?.(data.name);
            }
          }}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
