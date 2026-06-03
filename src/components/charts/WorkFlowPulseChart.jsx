import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [
  { name: "Assigned", value: 19 },
  { name: "Fix In-Progress", value: 16 },
  { name: "In Verification", value: 9 },
  { name: "New", value: 8 },
  { name: "Open", value: 5 },
];

export default function WorkFlowPulseChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart layout="vertical" data={data}>
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Bar dataKey="value" fill="#bfc9ff" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
