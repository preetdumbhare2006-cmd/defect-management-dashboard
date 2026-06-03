import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  { name: "Richa", value: 15 },
  { name: "Piyush", value: 8 },
  { name: "Priyasha", value: 5 },
  { name: "Ashish", value: 4 },
  { name: "Sakshi", value: 4 },
];

export default function AddedByChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />

        <YAxis type="category" dataKey="name" width={80} />

        <Bar dataKey="value" fill="#f3dd77" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
