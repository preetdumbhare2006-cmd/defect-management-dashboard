import { useState, useEffect } from "react";
import axios from "axios";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SeverityChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/severity")
      .then((res) => {
        console.log("Severity Data:", res.data);
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />

        <PolarAngleAxis dataKey="subject" />

        <PolarRadiusAxis angle={30} domain={[0, "auto"]} />

        <Radar
          name="Defects"
          dataKey="value"
          stroke="#8b8df8"
          fill="#8b8df8"
          fillOpacity={0.5}
        />

        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
