import { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function TagsChart({ onFilter }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/tags")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />

        <YAxis type="category" dataKey="tag" />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#bfead5"
          radius={[0, 8, 8, 0]}
          onClick={(data) => {
            onFilter?.(data.tag);
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
