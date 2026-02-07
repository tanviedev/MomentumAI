export default function InsightCard({ insight }) {
  return (
    <div className="card">
      <h3>AI Insight</h3>

      <div className="row">
        <span className="label">Failure</span>
        <span className="value danger">{insight.failure_reason}</span>
      </div>

      <div className="row">
        <span className="label">Success</span>
        <span className="value success">{insight.success_driver}</span>
      </div>

      <div className="confidence">
        <span>Confidence</span>
        <div className="bar">
          <div
            className="fill"
            style={{ width: `${insight.confidence_score * 100}%` }}
          />
        </div>
        <small>{insight.confidence_score}</small>
      </div>
    </div>
  );
}
