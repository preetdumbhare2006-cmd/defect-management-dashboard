import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  { name: "0-2 days", value: 5 },
  { name: "3-7 days", value: 15 },
  { name: "7+ days", value: 31 },
];

export default function AgingChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />

        <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#f6c9cf" />
      </BarChart>
    </ResponsiveContainer>
  );
}
