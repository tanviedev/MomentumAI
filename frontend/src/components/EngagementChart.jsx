import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function EngagementChart({ engagement }) {
  const data = [
    { name: "Engagement", value: engagement.engagement_rate },
    { name: "Saves", value: engagement.save_rate },
    { name: "Shares", value: engagement.share_rate }
  ];

  return (
    <div className="chart-card">
      <h3>Engagement Breakdown</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
