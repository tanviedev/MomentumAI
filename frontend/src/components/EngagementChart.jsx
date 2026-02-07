import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function EngagementChart({ data }) {
  const chartData = [
    { name: "Engagement", value: data.engagement_rate * 100 },
    { name: "Saves", value: data.save_rate * 100 },
    { name: "Shares", value: data.share_rate * 100 }
  ];

  return (
    <div className="card">
  <h3>Engagement Breakdown</h3>
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

  );
}
