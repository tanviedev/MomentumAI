import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MomentumChart({ engagement }) {
  const data = [
    { name: "Passive", value: engagement.engagement_rate },
    { name: "Intent", value: engagement.save_rate },
    { name: "Amplification", value: engagement.share_rate }
  ];

  return (
    <div className="chart-card">
      <h3>Engagement Momentum</h3>
      <p style={{ fontSize: "0.8rem", color: "#aaa" }}>
        Passive → Intent → Distribution strength
      </p>
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
