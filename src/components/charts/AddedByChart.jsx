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



export default function AddedByChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/added-by")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />

        <YAxis type="category" dataKey="name" width={90} />

        <Tooltip />

        <Bar dataKey="value" fill="#f3dd77" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
