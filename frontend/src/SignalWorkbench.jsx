import { useEffect, useState } from "react";
import { fetchLinks, fetchContentByLink, analyzeRaw } from "./api";
import EngagementChart from "./components/EngagementChart";
import MomentumChart from "./components/MomentumChart";
import "./App.css";

export default function SignalWorkbench() {
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState("");
  const [signals, setSignals] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH LINKS ---------------- */
  useEffect(() => {
    fetchLinks()
      .then((data) => setLinks(data.links))
      .catch(console.error);
  }, []);

  /* ---------------- FETCH SIGNALS BY LINK ---------------- */
  async function handleLinkSelect(link) {
    setSelectedLink(link);
    setInsights(null);
    setSignals(null);

    if (!link) return;

    try {
      const content = await fetchContentByLink(link);
      setSignals(content);
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------------- ANALYZE RAW SIGNALS ---------------- */
  async function handleAnalyze() {
    if (!signals) return;
    setLoading(true);
    try {
      const result = await analyzeRaw(signals);
      setInsights(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- SAFE UPDATE HELPERS ---------------- */
  const updateField = (key, value) =>
    setSignals((prev) => ({ ...prev, [key]: value }));

  const updateNested = (parent, key, value) =>
    setSignals((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value
      }
    }));

  return (
    <div className="app-container">
      <h1>Content Signal Intelligence</h1>

      {/* ---------------- LINK SELECT ---------------- */}
      <div className="card">
        <label>Select Content Link</label>
        <select value={selectedLink} onChange={(e) => handleLinkSelect(e.target.value)}>
          <option value="">-- Select --</option>
          {links.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* ---------------- SIGNALS EDITOR ---------------- */}
      {signals && (
        <div className="card">
          <h2>Performance Overview</h2>

          <label>Performance Status</label>
          <input
            value={signals.performance_status}
            onChange={(e) => updateField("performance_status", e.target.value)}
          />

          <h3>Engagement Profile</h3>

          <label>Engagement Rate</label>
          <input
            type="number"
            step="0.001"
            value={signals.engagement_profile.engagement_rate}
            onChange={(e) =>
              updateNested("engagement_profile", "engagement_rate", +e.target.value)
            }
          />

          <label>Retention Rate</label>
          <input
            type="number"
            step="0.001"
            value={signals.engagement_profile.save_rate}
            onChange={(e) =>
              updateNested("engagement_profile", "save_rate", +e.target.value)
            }
          />

          <label>Amplification Rate</label>
          <input
            type="number"
            step="0.001"
            value={signals.engagement_profile.share_rate}
            onChange={(e) =>
              updateNested("engagement_profile", "share_rate", +e.target.value)
            }
          />

          <label>Primary Engagement Mode</label>
          <select
            value={signals.engagement_profile.dominant_engagement}
            onChange={(e) =>
              updateNested("engagement_profile", "dominant_engagement", e.target.value)
            }
          >
            <option>likes</option>
            <option>shares</option>
            <option>comments</option>
            <option>reposts</option>
            <option>saves</option>
          </select>

          <h3>Content Evaluation</h3>

          <label>Content Value Type</label>
          <input
            value={signals.content_value_type}
            onChange={(e) => updateField("content_value_type", e.target.value)}
          />

          <label>Hook Strength</label>
          <select
            value={signals.hook_analysis.hook_strength}
            onChange={(e) =>
              updateNested("hook_analysis", "hook_strength", e.target.value)
            }
          >
            <option>very strong</option>
            <option>strong</option>
            <option>average</option>
            <option>weak</option>
            <option>very weak</option>
          </select>

          <label>Audience Fatigue Level</label>
          <select
            value={signals.topic_health.fatigue_level}
            onChange={(e) =>
              updateNested("topic_health", "fatigue_level", e.target.value)
            }
          >
            <option>fresh</option>
            <option>low</option>
            <option>medium</option>
            <option>high</option>
            <option>saturated</option>
          </select>

          <label>Audience Intent Alignment</label>
          <select
            value={signals.audience_alignment.intent_match}
            onChange={(e) =>
              updateNested("audience_alignment", "intent_match", e.target.value)
            }
          >
            <option>strongly aligned</option>
            <option>aligned</option>
            <option>neutral</option>
            <option>misaligned</option>
            <option>conflicting</option>
          </select>

          <label>Timing Quality</label>
          <select
            value={signals.distribution_health.timing_quality}
            onChange={(e) =>
              updateNested("distribution_health", "timing_quality", e.target.value)
            }
          >
            <option>excellent</option>
            <option>good</option>
            <option>average</option>
            <option>poor</option>
            <option>missed</option>
          </select>

          <label>Distribution Decay Pattern</label>
          <select
            value={signals.distribution_health.decay_pattern}
            onChange={(e) =>
              updateNested("distribution_health", "decay_pattern", e.target.value)
            }
          >
            <option>viral spike</option>
            <option>slow burn</option>
            <option>steady</option>
            <option>early drop</option>
            <option>flat</option>
          </select>
        </div>
      )}

      {/* ---------------- ANALYZE BUTTON ---------------- */}
      {signals && (
        <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Content"}
        </button>
      )}

      {/* ---------------- LLM INSIGHTS ---------------- */}
      {insights && (
        <div className="card">
          <h2>LLM Insights</h2>
          <div className="insights">
            <div className="insight-item">
              <div className="insight-title">Why it underperformed</div>
              <div className="insight-muted">{insights.llm_insight.failure_reason}</div>
            </div>

            <div className="insight-item">
              <div className="insight-title">What worked</div>
              <div className="insight-muted">{insights.llm_insight.success_driver}</div>
            </div>

            <div className="insight-item">
              <div className="insight-title">Recommended Actions</div>
              <ul className="insight-muted">
                {insights.llm_insight.recommendations.map((a, i) => (
                  <li key={i}> {a}</li>
                ))}
              </ul>
            </div>

            <div className="insight-item">
              <div className="insight-title">Confidence Score</div>
              <div className="insight-muted">
                {(insights.llm_insight.confidence_score * 100).toFixed(0)}%
              </div>
            </div>
        </div>

        </div>
      )}

      {/* ---------------- CHARTS ---------------- */}
      {signals && insights && (
        <div className="charts-grid">
          <EngagementChart engagement={signals.engagement_profile} />
          <MomentumChart engagement={signals.engagement_profile} />
        </div>
      )}
    </div>
  );
}
