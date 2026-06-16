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

export default function AgingChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://https://defect-dashboard-api.onrender.com/api/charts/aging")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />

        <YAxis dataKey="name" type="category" />

        <Tooltip />

        <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#f6c9cf" />
      </BarChart>
    </ResponsiveContainer>
  );
}
