import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Regression", value: 46 },
  { name: "User Story", value: 14 },
];

const COLORS = ["#bfdcff", "#f4df7c"];

export default function DefectSourceChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} innerRadius={60} outerRadius={85} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
