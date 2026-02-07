import { useEffect, useState } from "react";
import { fetchLinks, analyzeLink } from "./api";
import "./App.css";

function App() {
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState("");
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch links on page load
  useEffect(() => {
    fetchLinks()
      .then((data) => setLinks(data.links))
      .catch(() => setError("Failed to load links"));
  }, []);

  const handleAnalyze = async () => {
    if (!selectedLink) return;

    setLoading(true);
    setError(null);
    setInsight(null);

    try {
      const result = await analyzeLink(selectedLink);
      setInsight(result.llm_insight);
    } catch (err) {
      setError("Something went wrong while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Content Insight Engine</h1>

      <p className="subtitle">
        Select a post link to analyze its performance
      </p>

      <select
        className="link-select"
        value={selectedLink}
        onChange={(e) => setSelectedLink(e.target.value)}
      >
        <option value="">-- Select a post link --</option>
        {links.map((link) => (
          <option key={link} value={link}>
            {link}
          </option>
        ))}
      </select>

      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={loading || !selectedLink}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p className="error">{error}</p>}

      {insight && (
        <div className="result-card">
          <h2>AI Insight</h2>

          <p>
            <strong>Failure Reason:</strong>{" "}
            {insight.failure_reason || "—"}
          </p>

          <p>
            <strong>Success Driver:</strong>{" "}
            {insight.success_driver || "—"}
          </p>

          <div>
            <strong>Recommended Actions:</strong>
            <ul>
              {insight.recommended_actions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>

          <p className="confidence">
            Confidence: {(insight.confidence_score * 100).toFixed(0)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
