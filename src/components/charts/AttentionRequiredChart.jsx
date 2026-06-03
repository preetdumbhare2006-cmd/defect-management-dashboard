import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Major", value: 17 },
  { name: "Crash", value: 2 },
];

const COLORS = ["#dd7b7b", "#ffd1d1"];

export default function AttentionRequiredChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} innerRadius={60} outerRadius={90} dataKey="value">
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
