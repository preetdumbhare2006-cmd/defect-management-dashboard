import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "Major", value: 27 },
  { subject: "Minor", value: 21 },
  { subject: "Cosmetic", value: 8 },
  { subject: "Crash", value: 5 },
  { subject: "None", value: 3 },
];

export default function SeverityChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          dataKey="value"
          stroke="#8b8df8"
          fill="#8b8df8"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
