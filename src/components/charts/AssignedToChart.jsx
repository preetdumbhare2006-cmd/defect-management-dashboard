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

export default function AssignedToChart({ onFilter }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://https://defect-dashboard-api.onrender.com/api/charts/assigned-to",
      )
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        layout="vertical"
        data={data}
        onClick={(state) => {
          console.log("CLICKED:", state);
          console.log("ONFILTER:", onFilter);

          if (state?.activeLabel) {
            onFilter?.(state.activeLabel);
          }
        }}
      >
        <XAxis type="number" />

        <YAxis type="category" dataKey="name" width={140} />

        <Tooltip />

        <Bar dataKey="value" fill="#98e3bf" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
