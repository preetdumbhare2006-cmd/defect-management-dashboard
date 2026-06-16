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

export default function WorkFlowPulseChart({ onFilter }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://https://defect-dashboard-api.onrender.com/api/charts/workflow-pulse")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />

        <Bar
          dataKey="value"
          fill="#bfc9ff"
          radius={[0, 8, 8, 0]}
          onClick={(data) => {
            if (data?.payload?.name) {
              onFilter(data.payload.name);
            }
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}