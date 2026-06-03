import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "QA", value: 25 },
  { name: "Info Origin", value: 14 },
  { name: "PROD", value: 10 },
  { name: "UAT", value: 8 },
];

const colors = ["#c5ceff", "#9ce0be", "#a8c7ef", "#f5df82"];

export default function EnvironmentChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" outerRadius={90}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
