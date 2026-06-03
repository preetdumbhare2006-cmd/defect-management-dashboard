import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  { tag: "-", value: 46 },
  { tag: "APP", value: 14 },
];

export default function TagsChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />

        <YAxis type="category" dataKey="tag" />

        <Bar dataKey="value" fill="#bfead5" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
