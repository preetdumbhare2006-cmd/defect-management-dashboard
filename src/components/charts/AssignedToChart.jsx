import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  { name: "Shweta Tarate", value: 14 },
  { name: "Not Assigned", value: 11 },
  { name: "Amey Bhosle", value: 8 },
  { name: "Pankaj Patle", value: 5 },
  { name: "Dipesh Bhattarai", value: 4 },
];

export default function AssignedToChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />

        <YAxis type="category" dataKey="name" width={100} />

        <Bar dataKey="value" fill="#98e3bf" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
